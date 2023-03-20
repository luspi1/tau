// Работа модалки на странице deal-card.html и deal-document

import { sendData, showInfoModal } from "../_functions"
import { initCloseModals }         from './managePopup'

const dealCardPageMain = document.querySelector('.deals')
const dealCardPage = document.querySelector('.deals .one-deal')
const dealDocumentsPage = document.querySelector('.deals .deals-documents')

if (dealCardPage || dealDocumentsPage) {

  const admissionModal = dealCardPageMain.querySelector('#document-preview-modal')
  const admissionButtons = document.querySelectorAll('[data-modal="document-preview-modal"]')

  admissionButtons.forEach(btn => {
    const dealBtnId = btn.dataset.id
    const dealBtnScript = btn.dataset.script

    btn.addEventListener('click', async () => {
      const paymentData = {id: dealBtnId}
      const jsonPaymentData = JSON.stringify(paymentData)
      const response = await sendData(jsonPaymentData, dealBtnScript)
      const finishedResponse = await response.json()
      const {status, errortext, html} = finishedResponse

      if (status === 'ok') {
        admissionModal.innerHTML = html
        initCloseModals()
      } else {
        showInfoModal(errortext)
      }
    })
  })
}

