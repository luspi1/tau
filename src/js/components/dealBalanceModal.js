// модалка добавления платежа
const addPaymentFileBtn = document.querySelector('.add-payment__file-wrapper input')
const addPaymentManualFill = document.querySelector('.add-payment__manual-fill')
const addPaymentFileFill = document.querySelector('.add-payment__file-fill')
const addPaymentReturnBtn = document.querySelector('.add-payment__import-return-btn')

const requiredFields = document.querySelectorAll('.add-payment input[data-required]')

const dealsAddBtn = document.querySelector('.deals-balance__add-btn')


const toggleRequiredFields = (reqInputs) => {
  if (reqInputs) {
    reqInputs.forEach(el => {
      if (el.dataset.required === 'true') {
        el.dataset.required = 'false'
        el.required = false
      } else {
        el.dataset.required = 'true'
        el.required = true
      }
    })
  }
}


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
    incomePageMain.style.minHeight = `${addPaymentModal.clientHeight}px`
    toggleRequiredFields(requiredFields)
  })
}

//Связка значения инпут с контентом

const dealName = document.querySelector('.deals-balance__list-content.deal-name')?.textContent
const dealContrAgent = document.querySelector('.deals-balance__deal-contragent')?.textContent
const dealMyCompany = document.querySelector(
  '.deals-balance__list-content.deal-company')?.textContent
const inputMyCompany = document.querySelector('.add-payment__input[name="add-payment_myCompany"]')
const inputContrAgent = document.querySelector('.add-payment__input[name="add-payment_agent"]')
const inputDealName = document.querySelector('.add-payment__input[name="add-payment_deal-title"]')


if (dealsAddBtn) {
  dealsAddBtn.addEventListener('click', () => {
    inputMyCompany.value = dealMyCompany
    inputContrAgent.value = dealContrAgent
    inputDealName.value = dealName
  })
}


