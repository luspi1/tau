import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader
} from '../_functions'


export const handleDocumentSignModal = (signModal) => {

  if (signModal.classList.contains('modal-document-sign')) {

    // Логика отправки информации подписей

    const signModalId = signModal.dataset.id

    //форма нашей подписи
    const ourForm = signModal.querySelector('.modal-document-sign__form-author')
    const ourNameField = ourForm.querySelector('.modal-document-sign__lastname')
    const ourDateField = ourForm.querySelector('.modal-document-sign__date')

    //форма подписи заказчика
    const customerForm = signModal.querySelector('.modal-document-sign__form-client')
    const customerFormContent = customerForm.querySelector('.modal-document-sign__client-info')
    const customerNameField = customerForm.querySelector('.modal-document-sign__lastname')
    const customerDateField = customerForm.querySelector('.modal-document-sign__date')

    const submitSignHandler = async (isOur, event) => {
      event.preventDefault()
      const data = serializeForm(event.target)
      const objData = {...formToObj(data), id_document: signModalId}
      const jsonData = JSON.stringify(objData)

      toggleLoader()

      try {
        const response = await sendData(jsonData, event.target.action)
        const finishedResponse = await response.json()

        toggleLoader()

        const {
          status,
          errortext,
          sign_fio,
          sign_date,
          sign_date_customer
        } = finishedResponse
        if (status === 'ok') {
          if (isOur) {
            ourForm.classList.add('_completed')
            ourNameField.textContent = sign_fio
            ourDateField.textContent = sign_date
            checkSigns()
          } else {
            customerFormContent.classList.add('_completed')
            customerNameField.textContent = sign_fio
            customerDateField.textContent = sign_date_customer
            if (ourForm.classList.contains('_completed')) {
              checkSigns()
            }
          }
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        toggleLoader()
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    }

    if (ourForm) {
      ourForm.addEventListener('submit', submitSignHandler.bind(null, true))
    }
    if (customerForm) {
      customerForm.addEventListener('submit', submitSignHandler.bind(null, false))
    }

    // Логика отправки документа заказчику

    const docSendBtn = signModal.querySelector('.modal-document-sign__btn-doc-send')
    const docSendScript = docSendBtn.dataset.script


    docSendBtn.addEventListener('click', async () => {

      const emailTextData = signModal.querySelector('.modal-document-sign__email-select-wrapper .choices__item--selectable').textContent

      const data = {id: signModalId, email: emailTextData}
      const jsonData = JSON.stringify(data)


      toggleLoader()

      try {
        const response = await sendData(jsonData, docSendScript)
        const finishedResponse = await response.json()

        toggleLoader()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          docSendBtn.textContent = 'Документ отправлен. Повторить?'
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        toggleLoader()
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    })


    // Логика отмены подписи

    const cancelSignBtn = ourForm.querySelector('.modal-document-sign__cancel-sign')
    const cancelSignScript = cancelSignBtn.dataset.script

    //Функция проверки подписей и показа/скрывания кнопки отмены подписи
    const checkSigns = () => {
      const validatedSigns = signModal.querySelectorAll('.modal-document-sign__form-author, .modal-document-sign__client-info')
      const isValid = Array.from(validatedSigns).every(el => el.classList.contains('_completed'))
      if (isValid) {
        cancelSignBtn.classList.add('hidden')
      } else {
        cancelSignBtn.classList.remove('hidden')
      }
    }


    cancelSignBtn.addEventListener('click', async () => {
      const data = {id: signModalId, sign_type: 'cancel'}
      const jsonData = JSON.stringify(data)

      toggleLoader()

      try {
        const response = await sendData(jsonData, cancelSignScript)
        const finishedResponse = await response.json()
        toggleLoader()
        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          ourForm.classList.remove('_completed')
          cancelSignBtn.classList.add('hidden')
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        toggleLoader()
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    })


    // смена вариантов подписания формы

    const variantSelect = ourForm.querySelector('.modal-document-sign__select-variant')

    variantSelect.addEventListener('change', (e) => {
      ourForm.dataset.variantState = e.target.value
    })

  }
}

