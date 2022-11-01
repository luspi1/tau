// Генерация нового наблюдателя на странице создания сделки

import { initPaymentsSelect } from "./customSelect";
import { initDateDeal } from "./customDate";
import { initDateDealMask } from "./inputMask";
import { closeSelectPopups, handlePopupInputs } from "../_functions";

// Появления списка элементов полученных от сервера в полях "Контрагент", "Исполнитель",
// "Наблюдатель"

const dealPopupInputs = document.querySelectorAll('.create-deal-page__popup-input')

if (dealPopupInputs) {
  dealPopupInputs.forEach(input => {
    input.addEventListener('input', handlePopupInputs)
  })
}

// закрытие попап-селектов

const createDealPage = document.querySelector('.create-deal-page')

closeSelectPopups(createDealPage)


// Генерация наблюдателя на странице создания сделки

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
      const observeSelectInput = observeEl.querySelector('.create-deal-page__popup-input')
      if (observeSelectInput) {
        observeSelectInput.addEventListener('input', handlePopupInputs)
      }
    })
  }
}










