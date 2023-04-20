import {
  formToObj,
  manageActivitySubmitBtn, resetSelect,
  sendData,
  serializeForm,
  showInfoModal
} from '../_functions'

export const handleDocumentSendModal = (sendModal) => {
  if (sendModal.classList.contains('modal-document-send')) {
    const sendForm = sendModal.querySelector('.send-form')
    const sendersList = sendModal.querySelector('.modal-document-send__list')
    const sendFormBtn = sendModal.querySelector('.send-form__btn')
    const emailsSelect = sendModal.querySelector('.send-form__select')
    const emailsSelectChoices = sendModal.querySelector('.choices')

    manageActivitySubmitBtn(emailsSelect, sendFormBtn)
    const handleSendSubmit = async (e) => {
      e.preventDefault()
      const dataScript = e.currentTarget.action
      const dataId = sendModal.dataset.id
      const data = serializeForm(e.currentTarget)
      const objData = {
        ...formToObj(data),
        id: dataId
      }
      const jsonData = JSON.stringify(objData)
      try {
        const response = await sendData(jsonData, dataScript)
        const finishedResponse = await response.json()
        const {status, errortext, html} = finishedResponse
        if (status === 'ok') {
          sendersList.insertAdjacentHTML('afterbegin', html)
          resetSelect(emailsSelectChoices, sendFormBtn)
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    }
    sendForm.addEventListener('submit', handleSendSubmit)
  }
}



