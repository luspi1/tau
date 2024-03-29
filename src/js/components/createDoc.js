import Choices from 'choices.js'
import {
  closeSelectPopups,
  formToObj,
  handlePopupInputs,
  handlePopupSubmit,
  sendData,
  serializeForm,
  showInfoModal
} from "../_functions"
import {body, modalOverlay} from '../_vars'

const createDocPage = document.querySelector('.create-doc-page')


if (createDocPage) {
  // установка обязательных полей при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    const currentPageState = createDocPage.dataset.pageState
    changeRequiredInputs(currentPageState, true)
  })

  // Функция установки ссылки шаблона в модалке "Операции м шаблонами" в состоянии "подключено" после выбора сделки и типа документа (акт, договор или доп. соглашения)

  const setTemplate = (docType) => {
    const templatesModalForm = createDocPage.querySelector('.modal-doc-template .modal-doc-template__states')
    const currentInfoInput = createDocPage.querySelector(`.create-doc-page__templates-info input[name="${docType}_template"]`)
    const templatesModalLink = createDocPage.querySelector('.modal-doc-template__template-basis-link')
    const templateManualInput = createDocPage.querySelector('.create-doc-page__tmpl-input')
    const templateManualInputData = createDocPage.querySelector('.create-doc-page__tmpl-input-data')
    templateManualInput.value = ''
    templateManualInputData.value = ''
    templatesModalForm.dataset.state = 'connected'
    templatesModalLink.textContent = currentInfoInput.value
    templatesModalLink.href = currentInfoInput.dataset.link
  }
  const setTemplateOfInput = () => {
    const docType = createDocPage.dataset.pageState
    if (docType === 'act' || docType === 'dogovor' || docType === 'dop') {
      setTemplate(docType)
    }
  }

  const setTemplateOfSelect = () => {
    const dealInputData = createDocPage.querySelector('.create-doc-page__data-input[name="id_deal"]')
    const docType = createDocPage.dataset.pageState
    if (dealInputData.value) {
      setTemplate(docType)
    }
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

  const changeRequiredInputs = (pageState, isInitialLoading) => {
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
        if (!isInitialLoading) {
          setTemplateOfSelect()
        }
        break
      case 'dogovor':
        if (!isInitialLoading) {
          setTemplateOfSelect()
        }
        break
      case 'dop':
        if (!isInitialLoading) {
          setTemplateOfSelect()
        }
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

  const typeDocForm = createDocPage.querySelector('.create-doc-page__form')
  const templatesInfo = typeDocForm.querySelector('.create-doc-page__templates-info')
  // функция обновления селектов плановых платежей и расчетных счетов
  const updateDocData = async (data, submitScript) => {
    try {
      const response = await sendData(data, submitScript)
      const finishedResponse = await response.json()

      const {
        status,
        errortext,
        invoices,
        planned_payments,
        is_dogovor,
        id_dogovor,
        templates
      } = finishedResponse
      if (status === 'ok') {
        const idDeal = JSON.parse(data).id_deal
        invoicesChoices.clearChoices()
        invoicesChoices.setValue(invoices)
        initPlannedPaymentSelect(planned_payments)
        const docFormDogovorId = typeDocForm.querySelector('.create-doc-page__doc-id-data').value

        //
        if (is_dogovor && docFormDogovorId !== id_dogovor) {
          typeDocForm.dataset.isDogovor = "true"
        } else {
          typeDocForm.dataset.isDogovor = "false"
        }

        typeDocForm.dataset.isNondeal = idDeal === "0" ? "true" : "false"

        // получение инпутов для работы с модалкой "Операции с шаблонами"

        templatesInfo.innerHTML = templates

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
                    id_deal: el.dataset.id
                  }
                  const selectDataJson = JSON.stringify(selectData)
                  updateDocData(selectDataJson, invoiceDataUrl)
                    .then(res => {
                      if (res) {
                        setTemplateOfInput()
                      }
                    })
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

  const dataDealInput = createDocPage.querySelector('.select-popup-data[name="id_deal"]')
  const dealListForm = createDocPage.querySelector('.modal-deal-selection__form')
  const dealListModal = createDocPage.querySelector('.modal-deal-selection')
  const handleDealListForm = async (e) => {
    e.preventDefault()
    const dealValue = formToObj(serializeForm(e.currentTarget))
    const dealInput = dealListForm.querySelector(`input[value="${dealValue?.dealId}"]`)
    const dealText = dealInput?.closest('.radio-list__item')?.querySelector('label').textContent.trim()

    const invoiceData = {
      id_deal: dealValue.dealId
    }
    const invoiceDataJson = JSON.stringify(invoiceData)
    updateDocData(invoiceDataJson, invoiceDataUrl)
      .then((res) => {
        if (res) {
          parentalContract.value = dealText
          dataDealInput.value = dealValue.dealId
          body.classList.remove('_lock')
          dealListModal.classList.remove('_active')
          modalOverlay.classList.remove('modal-overlay_active')
          setTemplateOfInput()
        }
      })
  }
  dealListForm.addEventListener('submit', handleDealListForm)

// Появления списка элементов полученных от сервера в поле "Шаблон документа"
  const docPopupInputs = createDocPage.querySelectorAll('.select-popup-input')

  if (docPopupInputs) {
    docPopupInputs.forEach(input => {
      input.addEventListener('input', handlePopupInputs)
    })
  }


// Передача состояния модалки "операции с шаблонами" скрытому инпуту на странице

  const templateModal = createDocPage.querySelector('.modal-doc-template__states')
  const templateStateInput = createDocPage.querySelector('.create-doc-page__template-state')

  const callback = (mutations) => {
    if (mutations[0].target) {
      templateStateInput.value = mutations[0].target.dataset.state
    }
  }
  const observer = new MutationObserver(callback)
  observer.observe(templateModal, {
    attributeFilter: ['data-state']
  })
}



