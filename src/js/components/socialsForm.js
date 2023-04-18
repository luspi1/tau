import { sendData, serializeForm, showInfoModal, toggleLoader, } from "../_functions"
import { body, modalOverlay, modalSocials }                      from "../_vars"
import { initSelects }                                           from "./customSelect"

const editSocialsForm = document.querySelector('.modal-socials__form')
const addLinkBtn = document.querySelector('.modal-socials__add-btn')
const socialLinks = document.querySelector('.modal-socials__list')
const socialsContainer = document.querySelector('.prime-info__socials-icons')


const updateSocials = (data) => {
  if (data) {
    const previousLinks = socialsContainer.querySelectorAll('a')
    if (previousLinks) {
      previousLinks.forEach(link => link.remove())
    }
    socialsContainer.insertAdjacentHTML('afterbegin', data)
  }
}


// Обработка события отправки формы социалок


// Обработка события отправки

if (editSocialsForm) {

  const dataUrl = editSocialsForm.dataset.url

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

      const {status, errortext, html} = finishedResponse
      if (status === 'ok') {
        updateSocials(html)
        modalSocials.classList.remove('_active')
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

  editSocialsForm.addEventListener('submit', handleFormSubmit)
}


// Добавление еще одной ссылки

const templateSocialsFragment = document.querySelector('#socials-link-template')?.content

if (templateSocialsFragment) {
  const templateSocials = templateSocialsFragment.querySelector('.socials-list__item')
  if (addLinkBtn) {
    addLinkBtn.addEventListener('click', () => {
      const socialLink = templateSocials.cloneNode(true)
      socialLinks.appendChild(socialLink)
      initSelects()
    })
  }
}


// Удаление ссылок

if (modalSocials) {
  modalSocials.addEventListener('click', (e) => {
    if (e.target.classList.contains('socials-list__delete-btn')) {
      const linkTarget = e.target.closest('.socials-list__item')
      const socialLinks = modalSocials.querySelector('.modal-socials__list')
      socialLinks.removeChild(linkTarget)
    }
  })
}








