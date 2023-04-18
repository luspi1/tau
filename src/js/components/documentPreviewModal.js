import { sendData, showInfoModal } from '../_functions'
import { sendDocModal }            from '../_vars'

export const handleDocumentPreviewModal = (previewModal) => {
  if (previewModal.classList.contains('modal-document-preview')) {
    const submitBtn = previewModal.querySelector('.modal-document-preview__send-btn')
    submitBtn.addEventListener('click', async (e) => {
      const dataScript = e.currentTarget.dataset.script
      const dataId = e.currentTarget.dataset.id

      const previewData = {id: dataId}
      const jsonData = JSON.stringify(previewData)
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

    })
  }
}

