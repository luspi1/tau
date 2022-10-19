// Генерация нового наблюдателя на странице создания сделки

import { initPaymentsSelect } from "./customSelect";
import { initDateDeal } from "./customDate";
import { initDateDealMask } from "./inputMask";
import { sendData, serializeForm, showInfoModal, toggleLoader } from "../_functions";
import { body, modalOverlay, modalSocials } from "../_vars";


const addObserverBtn = document.querySelector('.create-deal-caption__add-observer-btn')
const observersList = document.querySelector('.create-deal-caption__observer-list')
const templateObserverFragment = document.querySelector('#deal-observer-template')?.content;
if (templateObserverFragment) {
  const templateObserve = templateObserverFragment.querySelector('.create-deal-page__input-wrapper')
  if (addObserverBtn) {
    addObserverBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const observeEl = templateObserve.cloneNode(true)
      observersList.appendChild(observeEl)
    })
  }
}

// Генерация нового платежа на странице создания сделки

const addPaymentsBtn = document.querySelector('.create-deal-caption__add-payments-btn')
const paymentsList = document.querySelector('.create-deal-payments__list')
const templatePaymentsFragment = document.querySelector('#deal-payments-template')?.content;
if (templatePaymentsFragment) {
  const templatePayment = templatePaymentsFragment.querySelector('.create-deal-payments__list-item')
  if (addPaymentsBtn) {
    addPaymentsBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const paymentEl = templatePayment.cloneNode(true)
      paymentsList.appendChild(paymentEl)
      initPaymentsSelect()
      initDateDeal()
      initDateDealMask()
    })
  }
}


// Появления списка элементов полученных от сервера в полях "Контрагент", "Исполнитель",
// "Наблюдатель"
async function handlePopupSubmit (inputValue, popup) {

  const jsonData = JSON.stringify(inputValue)

  const response = await sendData(jsonData, 'test.txt')
  const finishedResponse = await response.json()

  const {status, errortext, html} = finishedResponse
  if (status === 'ok') {
    popup.classList.add('select-popup_active')
    const popupList = popup.querySelector('.select-popup__list')

    html.forEach(el => {
      popupList.insertAdjacentHTML('beforeend', el)
    })

  } else {
    showInfoModal(errortext)
  }
}


const dealPopupInputs = document.querySelectorAll('.create-deal-page__popup-input')

if (dealPopupInputs) {

  dealPopupInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let inputValue = e.target.value
      const targetSelectPopup = e.currentTarget.closest('.create-deal-page__input-wrapper').querySelector('.select-popup')

      if (inputValue.length > 2) {
        handlePopupSubmit(inputValue, targetSelectPopup)
      } else {
        targetSelectPopup.classList.remove('select-popup_active')
      }

    })


  })
}
















