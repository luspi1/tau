import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader,
  updateFields
}                                            from "../_functions"
import { body, modalFullname, modalOverlay } from "../_vars"

const editFullnameForm = document.querySelector('.modal-fullname__form')
const primeSection = document.querySelector('.prime-info')
const fullnameUpdatableFields = primeSection?.querySelectorAll('[data-updField]')


// Обработка события отправки

if (editFullnameForm) {

  const dataUrl = editFullnameForm.dataset.url

  async function handleFormSubmit(event) {
    event.preventDefault()

    const data = serializeForm(event.target)
    const objData = formToObj(data)
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    try {
      const response = await sendData(jsonData, dataUrl)
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
    } catch (err) {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

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

  editFullnameForm.addEventListener('focusin', (e) => {
    const inputTarget = e.target
    inputTarget.classList.add('modal-fullname__input_active')
  })

  editFullnameForm.addEventListener('focusout', (e) => {
    const inputTarget = e.target

    if (!inputTarget.value) {
      inputTarget.classList.remove('modal-fullname__input_active')
    }

  })
}
