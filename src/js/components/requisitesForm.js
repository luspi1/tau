import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader,
  updateFields
}                                        from "../_functions"
import { modalOverlay, modalRequisites } from "../_vars"

const editRequisitesForm = document.querySelector('.modal-requisites__form')
const bankSection = document.querySelector('.bank-details')
const requisitesUpdatableFields = bankSection?.querySelectorAll('[data-updField]')


// Обработка события отправки

if (editRequisitesForm) {

  const dataUrl = editRequisitesForm.dataset.url

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
        updateFields(objData, requisitesUpdatableFields)
        modalRequisites.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  editRequisitesForm.addEventListener('submit', handleFormSubmit)
}


// Валидация

if (editRequisitesForm) {
  editRequisitesForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('modal-requisites__input_active')
    } else {
      inputTarget.classList.remove('modal-requisites__input_active')
    }
  })
}
