import {
  formToObj, sendData,
  serializeForm, showInfoModal, toggleLoader, updateFields
} from "../_functions";
import { modalOverlay, body, modalFullname } from "../_vars";

const editFullnameForm = document.querySelector('.modal-fullname__form')
const primeSection = document.querySelector('.prime-info')
const fullnameUpdatableFields = primeSection?.querySelectorAll('[data-updField]')

async function handleFormSubmit (event) {
  event.preventDefault()

  const data = serializeForm(event.target)
  const objData = formToObj(data)
  const jsonData = JSON.stringify(objData)

  toggleLoader()

  const response = await sendData(jsonData, '/include/ajax/save_fio.php')
  const finishedResponse = await response.json()

  toggleLoader()

  const {status, errortext} = finishedResponse
  if (status === 'ok') {
    updateFields(objData, fullnameUpdatableFields)
    modalFullname.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')
  } else {
    showInfoModal(errortext)
  }
}


// Обработка события отправки

if (editFullnameForm) {
  editFullnameForm.addEventListener('submit', handleFormSubmit)
}


// Валидация

if (editFullnameForm) {
  editFullnameForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    const currentErrorMessage = inputTarget.closest('.modal-fullname__item').querySelector('.error-message')
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
      currentErrorMessage.classList.add('_active')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
      currentErrorMessage.classList.remove('_active')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('modal-fullname__input_active')
    } else {
      inputTarget.classList.remove('modal-fullname__input_active')
    }
  })
}
