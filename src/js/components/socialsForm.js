import { modalOverlay, body, modalSocials, modalPassport } from "../_vars";
import { initSelects } from "./customSelect";
import {
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader,
} from "../_functions";

const editSocialsForm = document.querySelector('.modal-socials__form')
const addLinkBtn = document.querySelector('.modal-socials__add-btn')
const socialLinks = document.querySelector('.modal-socials__list')
const socialsContainer = document.querySelector('.prime-info__socials-icons')


const updateSocials = (data) => {
  if (data) {
    socialsContainer.innerHTML = data
  }
}


let linkCount = 2;

// Обработка события отправки формы социалок

async function handleFormSubmit (event) {
  event.preventDefault()

  const data = serializeForm(event.target)

  const arrData = Array.from(data.entries())

  const jsonData = JSON.stringify(arrData)
  toggleLoader()

  const response = await sendData(jsonData, '/include/ajax/save_social.php')
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
}


// Обработка события отправки

if (editSocialsForm) {
  editSocialsForm.addEventListener('submit', handleFormSubmit)
}


// Добавление еще одной ссылки

const templateSocialsFragment = document.querySelector('#socials-link-template').content;

const templateSocials = templateSocialsFragment.querySelector('.socials-list__item')


const deleteSocialsItem = (e) => {
  socialLinks.removeChild(e.target)
}


if (addLinkBtn) {
  addLinkBtn.addEventListener('click', () => {
    const socialLink = templateSocials.cloneNode(true)
    const socialLinkCount = socialLink.querySelector('.socials-list__item-count')
    socialLinkCount.textContent = linkCount

    socialLinks.appendChild(socialLink)
    initSelects()
    linkCount++

    const linkItems = socialLinks.querySelectorAll('.socials-list__item')
    const currentLink = linkItems[linkItems.length - 1]

    currentLink.querySelector('.socials-list__delete-btn').addEventListener('click', (e) => {
      e.preventDefault()
      socialLinks.removeChild(currentLink)
      linkCount--
    })
  })
}

