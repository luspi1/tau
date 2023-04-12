import Choices                 from 'choices.js'
import {
  checkValue,
  closeSelectPopups,
  handlePopupInputs,
  handlePopupSubmit,
  sendData,
  showInfoModal,
}                              from "../_functions"
import { modalOverlay }        from "../_vars"
import { initAllDates }        from './customDate'
import { initChangeableLists } from './manageChangeableList'


const createDealPage = document.querySelector('.create-deal-page')

if (createDealPage) {

  const submitBtn = createDealPage.querySelector('.create-deal-page__save-btn')

// Генерация "Данные договора" в зависимости от кейса

  const dealCaseInput = document.querySelector('.create-deal-page__case-input')
  const dealCaseDataInput = document.querySelector('.create-deal-page__data-case')
  const dealCaseSelectPopup = dealCaseInput?.closest('.select-input-wrapper').querySelector('.select-popup')


  const dealAlertModal = document.querySelector('.deal-create-alert')
  const dealAlertCloseBtn = document.querySelector('.deal-create-alert__close-btn')
  const dealAlertSubmitBtn = document.querySelector('.deal-create-alert__agree-btn')
  const dealTreatyData = document.querySelector('.create-deal-page .create-deal-page__changeable-content')

  const caseInfoUrl = dealCaseInput.dataset.infoUrl
  const caseInvoicesUrl = dealCaseInput.dataset.invoicesUrl


  //Селект расчетных счетов

  const invoicesSelect = createDealPage.querySelector('.create-deal-page__invoices-select')

  const invoicesChoices = new Choices(invoicesSelect, {
    itemSelectText: '',
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true
  })


  const updateInvoices = async (data, submitScript) => {
    const response = await sendData(data, submitScript)
    const finishedResponse = await response.json()

    const {status, errortext, invoices} = finishedResponse
    if (status === 'ok') {
      invoicesChoices.clearChoices()
      if (invoices) {
        invoicesChoices.setValue(invoices)
      }
    } else {
      showInfoModal(errortext)
    }
  }

  const handleCaseSubmit = async (popupElValue, popupElId) => {
    const caseData = {id_case: popupElId}
    const jsonCaseData = JSON.stringify(caseData)

    try {
      const response = await sendData(jsonCaseData, caseInfoUrl)
      const finishedResponse = await response.json()

      const {status, errortext, html} = finishedResponse
      if (status === 'ok') {
        dealTreatyData.innerHTML = html
        dealCaseDataInput.value = popupElId
        dealCaseInput.value = popupElValue
        dealCaseSelectPopup.dataset.selected = "true"
        submitBtn.classList.remove('btn_disabled')

        updateInvoices(jsonCaseData, caseInvoicesUrl)
        initChangeableLists()
        initAllDates()
      } else {
        showInfoModal(errortext)
      }
    } catch {
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
  }

  if (dealAlertCloseBtn) {
    dealAlertCloseBtn.addEventListener('click', () => {
      dealAlertModal.hidden = true
      modalOverlay.classList.remove('modal-overlay_active')
    })
  }
  if (dealAlertSubmitBtn) {
    dealAlertSubmitBtn.addEventListener('click', () => {
      dealAlertModal.hidden = true
      modalOverlay.classList.remove('modal-overlay_active')
      handleCaseSubmit(dealAlertModal.dataset.deal, dealAlertModal.dataset.caseId)
    })
  }

  const showDealAlert = () => {
    dealAlertModal.hidden = false
    modalOverlay.classList.add('modal-overlay_active')
    modalOverlay.addEventListener('click', () => {
      dealAlertModal.hidden = true
      modalOverlay.classList.remove('modal-overlay_active')
    })
  }

  if (dealCaseSelectPopup) {
    dealCaseSelectPopup.addEventListener('click', (e) => {
      const popupEl = e.target

      if (popupEl.tagName === 'LI') {
        dealAlertModal.dataset.deal = popupEl.textContent
        dealAlertModal.dataset.caseId = popupEl.dataset.id
        if (e.currentTarget.dataset.selected === "true") {
          showDealAlert()
        } else {
          handleCaseSubmit(popupEl.textContent, popupEl.dataset.id)
        }
      }
    })
  }


  if (dealCaseInput) {
    dealCaseInput.addEventListener('click', (e) => {
      const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
      if (targetSelectPopup.dataset.selected === "true") {
        targetSelectPopup.classList.add('select-popup_active')
      }
    })


    dealCaseInput.addEventListener('input', (e) => {
      let inputValue = e.target.value
      const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
      if (inputValue.length > 2) {
        handlePopupSubmit(inputValue, targetSelectPopup)
      }
    })
  }
// Появления списка элементов полученных от сервера в поле "Контрагент"

  const dealContragentInput = document.querySelector('.create-deal-page__contragent-input')

  if (dealContragentInput) {
    dealContragentInput.addEventListener('input', handlePopupInputs)
  }


// функция обработки полей с поисковыми запросами, с добавлением данных о выбранном кейсе
  const handleCasePopupInputs = (e) => {
    let inputValue = e.target.value

    const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
    if (inputValue.length > 2) {
      let caseId = dealCaseDataInput.value
      handlePopupSubmit(inputValue, targetSelectPopup, {id_case: caseId})
        .then(() => {
          const popupElements = targetSelectPopup.querySelectorAll('li')
          if (popupElements) {
            popupElements.forEach(el => {
              el.addEventListener('click', () => {
                const targetInput = el.closest('.select-input-wrapper').querySelector('.select-popup-input')
                const dataInput = el.closest('.select-input-wrapper').querySelector('.select-popup-data')
                targetInput.value = el.textContent
                dataInput.value = el.dataset.id
                targetSelectPopup.classList.remove('select-popup_active')
              })
            })
          } else {
            targetSelectPopup.classList.remove('select-popup_active')
          }
        })
    }
  }


// Появления списка элементов полученных от сервера в поле "Наша организация" и "Наблюдатель"

  const dealCaseInfoInput = document.querySelectorAll('.create-deal-page__case-info-input')

  if (dealCaseInfoInput) {
    dealCaseInfoInput.forEach(el => {
      el.addEventListener('input', handleCasePopupInputs)
    })
  }


// закрытие попап-селектов


  closeSelectPopups(createDealPage)


// Генерация наблюдателя на странице создания сделки


  const addObserverBtn = document.querySelector('.create-deal-caption__add-observer-btn')
  const observersList = document.querySelector('.create-deal-caption__observer-list')
  const templateObserverFragment = document.querySelector('#deal-observer-template')?.content
  if (templateObserverFragment) {
    const templateObserve = templateObserverFragment.querySelector('.create-deal-page__input-wrapper')
    if (addObserverBtn) {
      addObserverBtn.addEventListener('click', (e) => {
        if (!checkValue('.create-deal-page__observer-input')) {
          return
        }
        e.preventDefault()
        const observeEl = templateObserve.cloneNode(true)
        observersList.appendChild(observeEl)
        const observeSelectInput = observeEl.querySelector('.create-deal-page__popup-input')
        if (observeSelectInput) {
          observeSelectInput.addEventListener('input', handleCasePopupInputs)
        }
      })
    }
  }

  //запрет ввода пробелов в инпуте названия сделки

  const dealNameInput = createDealPage.querySelector('input[name="deal_name"]')
  dealNameInput.addEventListener('input', (e) => {
    if (e.currentTarget.value[0] === ' ') {
      e.currentTarget.value = e.currentTarget.value.trim()
    }
  })
}

