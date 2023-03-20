import { sendData, showInfoModal } from '../_functions'
import { initCloseModals }         from './managePopup'

const generatedModalBtns = document.querySelectorAll('button[data-type-btn="generated"]')
if (generatedModalBtns) {

  generatedModalBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const generatedModalId = generatedModalBtns[0].dataset.modal
      const generatedModal = document.querySelector(`#${generatedModalId}`)

      const generateId = btn.dataset.id
      const generateScript = btn.dataset.script

      const paymentData = {id: generateId}
      const jsonPaymentData = JSON.stringify(paymentData)
      const response = await sendData(jsonPaymentData, generateScript)
      const finishedResponse = await response.json()
      const {status, errortext, html} = finishedResponse

      if (status === 'ok') {
        generatedModal.innerHTML = html
        initCloseModals()
      } else {
        showInfoModal(errortext)
      }
    })
  })

}
