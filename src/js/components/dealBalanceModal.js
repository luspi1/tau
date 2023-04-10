// модалка добавления платежа
import { sendData, showInfoModal, togglePaymentState, toggleRequiredFields } from '../_functions'
import { body, modalOverlay }                                                from "../_vars"
import { initAllDates }                                                      from './customDate'
import { initSelects }                                                       from './customSelect'
import { initDateInputMasks }                                                from './inputMask'
import { initCloseModals }                                                   from './managePopup'

const initPaymentModal = () => {
  initSelects()
  initAllDates()
  initDateInputMasks()
  initCloseModals()
  const addPaymentFileBtn = document.querySelector('.add-payment__file-wrapper input')
  const addPaymentManualFill = document.querySelector('.add-payment__manual-fill')
  const addPaymentFileFill = document.querySelector('.add-payment__file-fill')
  const addPaymentReturnBtn = document.querySelector('.add-payment__import-return-btn')

  const requiredFields = document.querySelectorAll('.add-payment input[data-required]')
  if (addPaymentFileBtn) {
    addPaymentFileBtn.addEventListener('change', async (e) => {

      const paymentScript = e.currentTarget.dataset.script
      const paymentId = e.currentTarget.dataset.id

      const paymentData = {id_payment: paymentId}
      const jsonPaymentData = JSON.stringify(paymentData)

      try {
        const response = await sendData(jsonPaymentData, paymentScript)
        const finishedResponse = await response.json()
        const {status, errortext} = finishedResponse

        if (status === 'ok') {
          e.target.value = ''
          addPaymentManualFill.classList.remove('add-payment__manual-fill_active')
          addPaymentFileFill.classList.add('add-payment__file-fill_active')
          toggleRequiredFields(requiredFields)
        } else {
          showInfoModal(errortext)
        }
      } catch {
        showInfoModal("Во время выполнения запроса произошла ошибка")
      }


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

      try {
        const response = await sendData(jsonPaymentData, admissionBtnScript)
        const finishedResponse = await response.json()
        const {status, errortext, html} = finishedResponse

        if (status === 'ok') {
          admissionModal.innerHTML = html
          initPaymentModal()
        } else {
          showInfoModal(errortext)
        }
      } catch {
        showInfoModal("Во время выполнения запроса произошла ошибка")
      }

    })
  })

  // Закрытие/открытие платежа

  const monthItem = incomePageMain.querySelector('.months')

  const getPaymentState = async (dataId, dataScript, checkBtn, closeBtn) => {
    const paymentData = {id_payment: dataId}
    const jsonPaymentData = JSON.stringify(paymentData)


    try {
      const response = await sendData(jsonPaymentData, dataScript)
      const finishedResponse = await response.json()
      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        togglePaymentState(checkBtn, closeBtn)
      } else {
        showInfoModal(errortext)
      }
    } catch {
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
  }

  monthItem.addEventListener('click', (e) => {
    if (e.target.className === "months__button-close") {
      const closePaymentBtn = e.target
      const paymentWrapper = closePaymentBtn.closest('.months__row')
      const paymentId = paymentWrapper.querySelector('[data-payment-id]').dataset.paymentId
      const paymentCheckBtn = paymentWrapper.querySelector('.months__indicators .months__circle')
      const paymentScript = closePaymentBtn.dataset.script
      getPaymentState(paymentId, paymentScript, paymentCheckBtn, closePaymentBtn)
    }
  })
}

// Подтверждение удаления сделки deal-balance.html

const deleteDealBtns = document.querySelectorAll('.deals-balance-table__cell.deals-balance-table__delete-btn')
let dataIdBtn
let dataScriptId
let dealRow
if (deleteDealBtns) {
  deleteDealBtns.forEach(btn => {
    btn.addEventListener('click', ({currentTarget}) => {
      dataIdBtn = currentTarget.dataset.id
      dataScriptId = currentTarget.dataset.script
      dealRow = currentTarget.closest('.deals-balance-table__row')
    })
  })

}

const confirmDealBtn = document.querySelector('#confirmDealBtn')
if (confirmDealBtn) {
  confirmDealBtn.addEventListener('click', async () => {
    const dealData = {id_deal_payment: dataIdBtn}
    const jsonDealData = JSON.stringify(dealData)
    try {
      const response = await sendData(jsonDealData, dataScriptId)
      const finishedResponse = await response.json()
      const {status, errortext, dohod, saldo} = finishedResponse

      if (status === 'ok') {
        document.querySelector('#dohod').innerText = dohod
        document.querySelector('#saldo').innerText = saldo

        dealRow.remove()
        body.classList.remove('_lock')
        modalOverlay.classList.remove('modal-overlay_active')
        document.querySelectorAll('.modal').forEach(modal => {
          if (modal.classList.contains('_active')) {
            modal.classList.remove('_active')
            modal.closest('main').style.minHeight = "calc(100vh - 60px)"
          }
        })

      } else {
        showInfoModal(errortext)
      }
    } catch {
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
  })
  
}
