import { formToObj, sendData, serializeForm, showInfoModal, toggleLoader } from '../_functions'
import { modalOverlay }                                                    from '../_vars'

export const handleDocumentSignModal = (signModal) => {

  if (signModal.classList.contains('modal-document-sign')) {

    // Логика отправки информации подписей

    const signModalId = signModal.dataset.id
    const ourForm = signModal.querySelector('.modal-document-sign__form-author')
    const ourFormContent = ourForm.querySelector('.modal-document-sign__author-info')
    const customerForm = signModal.querySelector('.modal-document-sign__form-client')
    const customerFormContent = customerForm.querySelector('.modal-document-sign__client-info')
    const submitSignHandler = async (isOur, event) => {
      event.preventDefault()
      const data = serializeForm(event.target)
      const objData = {...formToObj(data), id_document: signModalId}
      const jsonData = JSON.stringify(objData)

      toggleLoader()

      const response = await sendData(jsonData, event.target.action)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        if (isOur) {
          ourFormContent.classList.add('_completed')
        } else {
          customerFormContent.classList.add('_completed')
        }
      } else {
        showInfoModal(errortext)
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
      const data = {id_document: signModalId}
      const jsonData = JSON.stringify(data)

      toggleLoader()

      const response = await sendData(jsonData, docSendScript)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        signModal.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        showInfoModal('Документ успешно отправлен')
      } else {
        showInfoModal(errortext)
      }
    })
  }
}
