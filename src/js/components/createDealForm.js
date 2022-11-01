// Генерация нового наблюдателя на странице создания сделки

import {
  closeSelectPopups,
  handlePopupInputs,
  handlePopupSubmit,
} from "../_functions";
import { modalOverlay } from "../_vars";


// Генерация "Данные договора" в зависимости от кейса

const dealCaseInput = document.querySelector('.create-deal-page__case-input')
const dealAlertModal = document.querySelector('.deal-create-alert')

const showDealAlert = () => {
  dealAlertModal.hidden = false
  modalOverlay.classList.add('modal-overlay_active')

  const dealAlertCloseBtn = dealAlertModal.querySelector('.deal-create-alert__close-btn')
  if (dealAlertCloseBtn) {
    dealAlertCloseBtn.addEventListener('click', () => {
      dealAlertModal.hidden = true
      modalOverlay.classList.remove('modal-overlay_active')
    })
  }

  modalOverlay.addEventListener('click', () => {
    dealAlertModal.hidden = true
    modalOverlay.classList.remove('modal-overlay_active')
  })


}


if (dealCaseInput) {
  dealCaseInput.addEventListener('input', (e) => {
    let inputValue = e.target.value
    const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
    if (inputValue.length > 2) {
      handlePopupSubmit(inputValue, targetSelectPopup)
        .then(() => {
          const popupElements = targetSelectPopup.querySelectorAll('li')
          if (popupElements) {
            popupElements.forEach(el => {
              el.addEventListener('click', () => {
                const targetInput = el.closest('.select-input-wrapper').querySelector('.select-popup-input')
                const dataInput = el.closest('.select-input-wrapper').querySelector('.select-popup-data')
                if (targetSelectPopup.dataset.selected === 'true' && inputValue) {
                  showDealAlert()
                } else {
                  targetInput.value = el.textContent
                  dataInput.value = el.dataset.id
                  targetSelectPopup.classList.remove('select-popup_active')
                  e.target.addEventListener('click', () => {
                    targetSelectPopup.classList.add('select-popup_active')
                  })
                  targetSelectPopup.dataset.selected = "true"
                }
              })
            })
          } else {
            targetSelectPopup.classList.remove('select-popup_active')
          }
        })
    }
  })
}
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










