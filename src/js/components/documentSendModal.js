import { initDocLetterBtns } from './createLetterModal'

export const handleDocumentSendModal = (sendModal) => {
  if (sendModal.classList.contains('modal-document-send')) {
    initDocLetterBtns()
  }
}



