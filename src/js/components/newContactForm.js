import { sendData, serializeForm, showInfoModal, toggleLoader } from "../_functions"
import { body, modalNewContact, modalOverlay }                  from "../_vars"

const createContactForm = document.querySelector('.new-contact__form')

// Обработка события отправки формы нового контакта


// Обработка события отправки

if (createContactForm) {

  const dataUrl = createContactForm.dataset.url

  async function handleFormSubmit(event) {
    event.preventDefault()
    const data = serializeForm(event.target)
    const arrData = Array.from(data.entries())
    const jsonData = JSON.stringify(arrData)
    toggleLoader()

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        modalNewContact.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        body.classList.remove('_lock')
        location.reload()
      } else {
        showInfoModal(errortext)
      }
    } catch {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
  }

  createContactForm.addEventListener('submit', handleFormSubmit)
}
