import { modalOverlay, body, modalSocials } from "../_vars";
import { initSelects } from "./customSelect";
const editSocialsForm = document.querySelector('.modal-socials__form')
const addLinkBtn = document.querySelector('.modal-socials__add-btn')
const socialLinks = document.querySelector('.modal-socials__list')

let linkCount = 3;

// Обработка события отправки формы социалок

if (editSocialsForm) {
  editSocialsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    modalSocials.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')
  })
}

// Добавление еще одной ссылки

if (addLinkBtn) {
  addLinkBtn.addEventListener('click', () => {
    socialLinks.insertAdjacentHTML('beforeend',
      `<li class="socials-list__item">
             <p class="socials-list__item-title">
                Ссылка №${linkCount}
             </p>
             <div class="socials-list__inputs-wrapper">
               <select class="socials-list__selector-link">
                 <option value="">Тип ссылки</option>
                 <option value="link1">Тип ссылки 1</option>
                 <option value="link2">Тип ссылки 2</option>
                 <option value="link3">Тип ссылки 3</option>
                 <option value="link4">Тип ссылки 4</option>
               </select>
               <input class="socials-list__address-link" type="text"
                               placeholder="Адрес ссылки">
             </div>
           </li>`)
    initSelects()
    linkCount++
  })
}


