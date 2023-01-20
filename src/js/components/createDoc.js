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

      const {status, errortext, invoices} = finishedResponse
      if (status === 'ok') {
        invoicesChoices.clearChoices()
        invoicesChoices.setValue(invoices)
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

                  if (createDocPage.getAttribute('data-page-state') === 'invoice') {
                    updateInvoices(selectDataJson, invoiceDataUrl)
                  }

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

  const typeDocSelect = document.querySelector('.create-doc-page__type-doc-select')

  if (typeDocSelect) {

    typeDocSelect.addEventListener('change', (e) => {
      createDocPage.dataset.pageState = e.target.value
    })

  }


}





