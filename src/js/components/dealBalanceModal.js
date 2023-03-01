// модалка добавления платежа
import { sendData, showInfoModal, toggleRequiredFields } from '../_functions'
import { initAllDates }                                  from './customDate'
import { initPaymentModalSelects }                       from './customSelect'
import { initDateInputMasks }                            from './inputMask'
import { initCloseModals }                               from './managePopup'

const initPaymentModal = () => {
  initPaymentModalSelects()
  initAllDates()
  initDateInputMasks()
  initCloseModals()
  const addPaymentFileBtn = document.querySelector('.add-payment__file-wrapper input')
  const addPaymentManualFill = document.querySelector('.add-payment__manual-fill')
  const addPaymentFileFill = document.querySelector('.add-payment__file-fill')
  const addPaymentReturnBtn = document.querySelector('.add-payment__import-return-btn')

  const requiredFields = document.querySelectorAll('.add-payment input[data-required]')
  if (addPaymentFileBtn) {
    addPaymentFileBtn.addEventListener('change', (e) => {
      e.target.value = ''
      addPaymentManualFill.classList.remove('add-payment__manual-fill_active')
      addPaymentFileFill.classList.add('add-payment__file-fill_active')
      toggleRequiredFields(requiredFields)
    })
  }
  if (addPaymentReturnBtn) {
    addPaymentReturnBtn.addEventListener('click', (e) => {
      addPaymentManualFill.classList.add('add-payment__manual-fill_active')
      addPaymentFileFill.classList.remove('add-payment__file-fill_active')
      toggleRequiredFields(requiredFields)
    })
  }
}


// Работа модалки на странице deal-balance.html

const dealsPageMain = document.querySelector('.deals-balance-page')

if (dealsPageMain) {
  initPaymentModal()
}

// Работа модалки на странице income.html

const incomePageMain = document.querySelector('.income-page')

if (incomePageMain) {

  const admissionModal = incomePageMain.querySelector('#add-payment-modal')
  const admissionButtons = document.querySelectorAll('.months__button')

  admissionButtons.forEach(btn => {
    const admissionBtnId = btn.dataset.paymentId
    const admissionBtnScript = btn.dataset.paymentScript

    btn.addEventListener('click', async () => {
      const paymentData = {id_payment: admissionBtnId}
      const jsonPaymentData = JSON.stringify(paymentData)
      const response = await sendData(jsonPaymentData, admissionBtnScript)
      const finishedResponse = await response.json()
      const {status, errortext, html} = finishedResponse

      if (status === 'ok') {
        admissionModal.innerHTML = html
        initPaymentModal()
      } else {
        showInfoModal(errortext)
      }
    })
  })
}

