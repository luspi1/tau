import Choices                from 'choices.js'
import {
  closeSelectPopups,
  formToObj,
  handlePopupInputs,
  handlePopupSubmit,
  sendData,
  serializeForm,
  showInfoModal
}                             from "../_functions"
import { body, modalOverlay } from '../_vars'

const createDocPage = document.querySelector('.create-doc-page')


if (createDocPage) {
  // установка обязательных полей при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    const currentPageState = createDocPage.dataset.pageState
    changeRequiredInputs(currentPageState)
  })

  // закрытие попап-селектов

  closeSelectPopups(createDocPage)

// Смена состояние страницы, в зависимости от селекта "Тип документа"
  const changeRequiredOnTarget = (inputs, state) => {
    inputs.forEach(el => {
      if (el.dataset.required.includes(state)) {
        el.required = true
      }
    })
  }

  const changeRequiredInputs = (pageState) => {
    const allOptionalRequiredInputs = createDocPage.querySelectorAll('[data-required]')
    allOptionalRequiredInputs.forEach(el => el.required = false)

    switch (pageState) {
      case 'initial':
        changeRequiredOnTarget(allOptionalRequiredInputs, 'initial')
        break
      case 'invoice':
        changeRequiredOnTarget(allOptionalRequiredInputs, 'invoice')
        break
      case 'act':
        changeRequiredOnTarget(allOptionalRequiredInputs, 'act')
        break
    }
  }


  const typeDocSelect = document.querySelector('.create-doc-page__type-doc-select')
  if (typeDocSelect) {
    typeDocSelect.addEventListener('change', (e) => {
      createDocPage.dataset.pageState = e.target.value
      changeRequiredInputs(e.target.value)
    })
  }


  //инициализация селектов плановых платежей и расчетных счетов
  const invoicesSelect = createDocPage.querySelector('.create-doc-page__invoice-doc-select .create-doc-page__select')
  const plannedPaymentSelect = createDocPage.querySelector('.create-doc-page__planned-payment-select .create-doc-page__select')

  const plannedPaymentChoices = new Choices(plannedPaymentSelect, {
    itemSelectText: '', searchEnabled: false, shouldSort: false, allowHTML: true
  })
  const invoicesChoices = new Choices(invoicesSelect, {
    itemSelectText: '', searchEnabled: false, shouldSort: false, allowHTML: true
  })


  // очистка и внесение новых данных в селект плановых платежей
  const initPlannedPaymentSelect = (plannedDataArr) => {
    plannedPaymentChoices.destroy()
    plannedPaymentChoices.init()
    plannedPaymentChoices.setValue(plannedDataArr)
  }

  // функция обновления селектов плановых платежей и расчетных счетов
  const updateInvoices = async (data, submitScript) => {
    try {
      const response = await sendData(data, submitScript)
      const finishedResponse = await response.json()

      const {status, errortext, invoices, planned_payments} = finishedResponse
      if (status === 'ok') {
        invoicesChoices.clearChoices()
        invoicesChoices.setValue(invoices)
        initPlannedPaymentSelect(planned_payments)
        return true
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  const parentalContract = createDocPage.querySelector('.parental-contract-input')
  const invoiceDataUrl = parentalContract.dataset.invoicesUrl

  if (parentalContract) {
    //обработка инпута сделки
    const handleParentalContractInput = (e) => {
      let inputValue = e.target.value

      const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
      if (inputValue.length > 2) {
        handlePopupSubmit(inputValue, targetSelectPopup)
          .then(() => {
            const popupElements = targetSelectPopup.querySelectorAll('li')
            if (popupElements) {
              popupElements.forEach(el => {
                el.addEventListener('click', () => {
                  const targetInput = el.closest('.select-input-wrapper').querySelector('.parental-contract-input')
                  const dataInput = el.closest('.select-input-wrapper').querySelector('.select-popup-data')
                  targetInput.value = el.textContent
                  dataInput.value = el.dataset.id
                  targetSelectPopup.classList.remove('select-popup_active')

                  const selectData = {
                    id_dogovor: el.dataset.id
                  }
                  const selectDataJson = JSON.stringify(selectData)
                  updateInvoices(selectDataJson, invoiceDataUrl)
                })
              })
            } else {
              targetSelectPopup.classList.remove('select-popup_active')
            }
          })
      }
    }
    parentalContract.addEventListener('input', handleParentalContractInput)
  }


  // обработка списка сделок в модалке

  const dataDealInput = createDocPage.querySelector('.select-popup-data[name="id_parents"]')
  const dealListForm = createDocPage.querySelector('.modal-deal-selection__form')
  const dealListModal = createDocPage.querySelector('.modal-deal-selection')
  const handleDealListForm = async (e) => {
    e.preventDefault()
    const dealValue = formToObj(serializeForm(e.currentTarget))
    const dealInput = dealListForm.querySelector(`input[value=${dealValue?.dealId}]`)
    const dealText = dealInput?.closest('.radio-list__item')?.querySelector('label').textContent.trim()

    const invoiceData = {
      id_dogovor: dealValue.dealId
    }
    const invoiceDataJson = JSON.stringify(invoiceData)
    updateInvoices(invoiceDataJson, invoiceDataUrl)
      .then((res) => {
        if (res) {
          parentalContract.value = dealText
          dataDealInput.value = dealValue.dealId
          body.classList.remove('_lock')
          dealListModal.classList.remove('_active')
          modalOverlay.classList.remove('modal-overlay_active')
        }
      })
  }
  dealListForm.addEventListener('submit', handleDealListForm)

  // рендер списка сделок с сервера по нажатию кнопки "Выберите сделку из списка"
  const selectionDealsModalBtn = createDocPage.querySelector('.create-doc-page__deal-selection-btn')
  const dealsList = dealListModal.querySelector('.modal-deal-selection__form-list')

  selectionDealsModalBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const idDeal = e.currentTarget.dataset.id
    const dataScript = e.currentTarget.dataset.script

    const data = {
      id: idDeal
    }

    const dataJson = JSON.stringify(data)

    try {
      const response = await sendData(dataJson, dataScript)
      const finishedResponse = await response.json()
      const {status, errortext, html} = finishedResponse
      if (status === 'ok') {
        dealsList.innerHTML = html
        return true
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  })


// Появления списка элементов полученных от сервера в поле "Шаблон документа"
  const docPopupInputs = createDocPage.querySelectorAll('.select-popup-input')

  if (docPopupInputs) {
    docPopupInputs.forEach(input => {
      input.addEventListener('input', handlePopupInputs)
    })
  }
}




