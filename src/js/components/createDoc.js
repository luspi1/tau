import Choices from 'choices.js'
import {
  closeSelectPopups,
  handlePopupInputs,
  handlePopupSubmit,
  sendData,
  showInfoModal
}              from "../_functions"

const createDocPage = document.querySelector('.create-doc-page')

if (createDocPage) {

  //Селект расчетных счетов

  const invoicesSelect = createDocPage.querySelector('.create-doc-page__invoice-doc-select .create-doc-page__select')

  const invoicesChoices = new Choices(invoicesSelect, {
    itemSelectText: '',
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true
  })

  const plannedPaymentSelect = createDocPage.querySelector('.create-doc-page__planned-payment-select .create-doc-page__select')
  const plannedPaymentSelectWrapper = createDocPage.querySelector('.create-doc-page__planned-payment-select')

  const plannedPaymentChoices = new Choices(plannedPaymentSelect, {
    itemSelectText: '',
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true
  })

  // Функция инициализации селекта плановых платежей при выборе договора в типе "Счет"

  const initPlannedPaymentSelect = (plannedDataArr) => {
    plannedPaymentChoices.destroy()
    plannedPaymentChoices.init()
    plannedPaymentChoices.setValue(plannedDataArr)
  }

// Появления списка элементов полученных от сервера в полях "Родительский договор", "Шаблон документа"

  const docPopupInputs = document.querySelectorAll('.create-doc-page .select-popup-input')

  if (docPopupInputs) {
    docPopupInputs.forEach(input => {
      input.addEventListener('input', handlePopupInputs)
    })
  }

  const parentalContract = document.querySelector('.create-doc-page .parental-contract-input')

  if (parentalContract) {

    const invoiceDataUrl = parentalContract.dataset.invoicesUrl
    const updateInvoices = async (data, submitScript) => {
      const response = await sendData(data, submitScript)
      const finishedResponse = await response.json()

      const {status, errortext, invoices, planned_payments} = finishedResponse
      if (status === 'ok') {

        invoicesChoices.clearChoices()
        invoicesChoices.setValue(invoices)

        initPlannedPaymentSelect(planned_payments)

      } else {
        showInfoModal(errortext)
      }
    }

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
}





