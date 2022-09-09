import { modalOverlay, modalPassport } from "../_vars";
import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader,
  updateFields
} from "../_functions";

const passportForm = document.querySelector('.passport-modal__form')
const docPage = document.querySelector('.page-doc')
const passportUpdatableFields = docPage?.querySelectorAll('[data-updField]')



async function handleFormSubmit (event) {
  event.preventDefault()

  const data = serializeForm(event.target)
  const objData = formToObj(data)
  const jsonData = JSON.stringify(objData)
  toggleLoader()

  const response = await sendData(jsonData, '/include/ajax/save_passport.php')
  const finishedResponse = await response.json()

  toggleLoader()

  const {status, errortext} = finishedResponse
  if (status === 'ok') {
    updateFields(objData, passportUpdatableFields)
    modalPassport.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
  } else {
    showInfoModal(errortext)
  }
}


// Обработка события отправки

if (passportForm) {
  passportForm.addEventListener('submit', handleFormSubmit)
}

// Валидация

if (passportForm) {
  passportForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('passport-modal__input_active')
    } else {
      inputTarget.classList.remove('passport-modal__input_active')
    }
  })
}
