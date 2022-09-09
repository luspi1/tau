import { modalOverlay, modalNewContact } from "../_vars";

const createContactForm = document.querySelector('.new-contact__form')

const newContactData = {
}

// Обработка события отправки

if (createContactForm) {
  createContactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const {
        newContactName,
        newContactType,
        newContactPhone,
        newContactEmail,
        newContactDesc
      } = e.target.elements;

      newContactData.newContactName = newContactName.value
      newContactData.newContactType = newContactType.value
      newContactData.newContactPhone = newContactPhone.value
      newContactData.newContactEmail = newContactEmail.value
      newContactData.newContactDesc = newContactDesc.value

      modalNewContact.classList.remove('_active')
      modalOverlay.classList.remove('modal-overlay_active')

    }
  )
}
