import { formToObj, sendData, serializeForm, showInfoModal } from '../_functions'
import { sendDocModal }                                      from '../_vars'

export const handleDocumentPreviewModal = (previewModal) => {
  if (previewModal.classList.contains('modal-document-preview')) {
    const previewForms = previewModal.querySelectorAll('form.modal-document-preview__panel-btns-right')
    const handlePreviewSubmit = async (e) => {
      e.preventDefault()
      const dataScript = e.currentTarget.action
      const dataId = previewModal.dataset.id
      const data = serializeForm(e.currentTarget)
      const objData = {
        ...formToObj(data),
        id: dataId
      }
      const jsonData = JSON.stringify(objData)
      try {
        const response = await sendData(jsonData, dataScript)
        const finishedResponse = await response.json()
        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          previewModal.classList.remove('_active')
          sendDocModal.classList.add('_active')
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    }
    previewForms.forEach(form => form.addEventListener('submit', handlePreviewSubmit))
  }
}

