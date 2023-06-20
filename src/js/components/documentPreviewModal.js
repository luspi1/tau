import {
  formToObj,
  manageActivitySubmitBtn,
  sendData,
  serializeForm,
  showInfoModal
}                             from '../_functions'
import { modalOverlay }       from '../_vars'
import { handleGeneratedBtn } from './generatedModals'

export const handleDocumentPreviewModal = (previewModal) => {
  if (previewModal.classList.contains('modal-document-preview')) {
    const previewForms = previewModal.querySelectorAll('form.modal-document-preview__panel-btns-right')


    const emailsSelects = previewModal.querySelectorAll('.modal-document-preview__email-select')
    emailsSelects.forEach(select => {
      const sendBtn = select.closest('form.modal-document-preview__panel-btns-right')
        .querySelector('.modal-document-preview__main-btn')
      manageActivitySubmitBtn(select, sendBtn)
    })


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
          modalOverlay.classList.remove('modal-overlay_active')
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    }
    previewForms.forEach(form => form.addEventListener('submit', handlePreviewSubmit))

    const generatedModalBtns = previewModal.querySelectorAll('button[data-type-btn="generated"]')
    if (generatedModalBtns) {
      generatedModalBtns.forEach(genBtn => {
        genBtn.addEventListener('click', handleGeneratedBtn)
      })
    }
  }
}

