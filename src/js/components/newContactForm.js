import { modalOverlay, modalNewContact, modalSocials, body } from "../_vars";
import { sendData, serializeForm, showInfoModal, toggleLoader } from "../_functions";

const createContactForm = document.querySelector('.new-contact__form')

// Обработка события отправки формы нового контакта

async function handleFormSubmit (event) {
  event.preventDefault()
  const data = serializeForm(event.target)
  const arrData = Array.from(data.entries())
  const jsonData = JSON.stringify(arrData)
  toggleLoader()

  const response = await sendData(jsonData, 'include/ajax/contact_new.php')
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
}


// Обработка события отправки

if (createContactForm) {
  createContactForm.addEventListener('submit', handleFormSubmit)
}
