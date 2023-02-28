// модалка добавления платежа
import { sendData, showInfoModal, toggleRequiredFields } from '../_functions'
import { initAllDates }                                  from './customDate'
import { initPaymentModalSelects }                       from './customSelect'
import { initDateInputMasks }                            from './inputMask'
import { initCloseModals }                               from './managePopup'

const dealsPageMain = document.querySelector('.deals-balance-page')

if (dealsPageMain) {
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
        const addPaymentModal = document.querySelector('#add-payment-modal')
        dealsPageMain.style.minHeight = `${addPaymentModal.clientHeight}px`
        toggleRequiredFields(requiredFields)
      })
    }
  }

  const addPaymentBtn = document.querySelector('.deals-balance__add-btn')
  const paymentId = addPaymentBtn.dataset.paymentId
  const paymentScript = addPaymentBtn.dataset.paymentScript
  const paymentModal = dealsPageMain.querySelector('#add-payment-modal')

  addPaymentBtn.addEventListener('click', async () => {
    const paymentData = {id_payment: paymentId}
    const jsonPaymentData = JSON.stringify(paymentData)
    const response = await sendData(jsonPaymentData, paymentScript)
    const finishedResponse = await response.json()

    const {status, errortext, html} = finishedResponse

    if (status === 'ok') {
      paymentModal.innerHTML = html
      initPaymentModal()
    } else {
      showInfoModal(errortext)
    }
  })
}


//Связка значения инпут с контентом
//
//   const dealName = document.querySelector('.deals-balance__list-content.deal-name')?.textContent
//   const dealContrAgent = document.querySelector('.deals-balance__deal-contragent')?.textContent
//   const dealMyCompany = document.querySelector(
//     '.deals-balance__list-content.deal-company')?.textContent
//
//   const inputMyCompany = document.querySelector('.add-payment__input[name="add-payment_myCompany"]')
//   const inputContrAgent = document.querySelector('.add-payment__input[name="add-payment_agent"]')
//   const inputDealName = document.querySelector('.add-payment__input[name="add-payment_deal-title"]')
//
//
//   if (dealsAddBtn) {
//     dealsAddBtn.addEventListener('click', () => {
//       inputMyCompany.value = dealMyCompany
//       inputContrAgent.value = dealContrAgent
//       inputDealName.value = dealName
//     })
//   }





