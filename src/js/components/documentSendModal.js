import { handleGeneratedBtn } from './generatedModals'

export const handleDocumentSendModal = (sendModal) => {
  if (sendModal.classList.contains('modal-document-send')) {
    const generatedModalBtns = sendModal.querySelectorAll('button[data-type-btn="generated"]')
    if (generatedModalBtns) {
      generatedModalBtns.forEach(genBtn => {
        genBtn.addEventListener('click', handleGeneratedBtn)
      })
    }
  }
}
