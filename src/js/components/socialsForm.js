import {modalOverlay, body, modalSocials} from "../_vars";
import {initSelects} from "./customSelect";

const editSocialsForm = document.querySelector('.modal-socials__form')
const addLinkBtn = document.querySelector('.modal-socials__add-btn')
const socialLinks = document.querySelector('.modal-socials__list')

let linkCount = 2;

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

const deleteSocialsItem = (e) => {
  socialLinks.removeChild(e.target)
}


if (addLinkBtn) {
  addLinkBtn.addEventListener('click', () => {

    const socialLink = `<li class="socials-list__item">
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
               <button class="socials-list__delete-btn" type="button">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.0839 9.31926C29.4788 9.71415 29.8737 10.109 30.3475 10.5829C30.5845 10.9778 30.9793 11.3727 31.2163 11.7676C33.2697 14.7687 34.1384 18.1647 33.6646 21.7976C33.1117 25.8254 31.0583 29.1424 27.6623 31.4328C24.9771 33.3282 21.897 34.039 18.58 33.7231C14.5522 33.3282 11.1562 31.5117 8.7079 28.2737C6.97041 26.0623 6.02269 23.5351 5.86474 20.6919C5.62781 17.4539 6.49654 14.5317 8.313 11.7676C8.62891 11.2937 8.94484 10.9778 9.26074 10.5039C9.65563 10.109 10.0505 9.71416 10.5244 9.24029C10.9192 9.00336 11.2352 8.68744 11.709 8.37154C14.0783 6.63405 16.8425 5.76531 19.6857 5.76531C22.6868 5.76531 25.372 6.55508 27.7413 8.29257C28.2941 8.68746 28.61 9.00335 29.0839 9.31926ZM11.1562 28.3527C15.8948 33.0913 23.6345 33.0913 28.3731 28.3527C33.1117 23.6141 33.1907 15.7954 28.4521 11.0568C23.7135 6.31814 15.9738 6.31814 11.2352 11.0567C6.41757 15.8743 6.41757 23.6141 11.1562 28.3527Z" fill="black"/>
                      <path d="M18.5796 19.8232C18.0267 19.2703 17.4739 18.7175 16.9211 18.1647C16.2103 17.4539 14.9466 16.1902 14.2358 15.4794C13.841 15.0846 13.8409 14.6107 14.2358 14.2158C14.5517 13.8999 15.1046 13.821 15.4995 14.2158C16.6051 15.3215 18.4216 17.138 19.5273 18.2437C19.6062 18.3226 19.6852 18.4016 19.7642 18.4806C19.8432 18.4016 19.9222 18.3226 20.0011 18.2436C21.1858 17.059 22.9233 15.3215 24.1079 14.1369C24.5818 13.663 25.2926 13.742 25.6085 14.3738C25.7664 14.6897 25.6875 15.0846 25.3716 15.4005C24.2659 16.5062 22.4494 18.3226 21.3438 19.4283C21.2648 19.5073 21.1858 19.5863 21.1068 19.6652C21.1858 19.7442 21.2648 19.8232 21.3437 19.9022C22.5284 21.0868 24.2659 22.8243 25.4505 24.009C25.9244 24.4828 25.7664 25.2726 25.2136 25.5095C24.8977 25.6675 24.5028 25.5885 24.1869 25.2726C23.0812 24.1669 21.2648 22.3504 20.1591 21.2448C20.0801 21.1658 20.0011 21.0868 19.9222 21.0078C19.8432 21.0868 19.7642 21.1658 19.6852 21.2448C18.5006 22.4294 16.7631 24.1669 15.5784 25.3516C15.2625 25.6675 14.8676 25.7464 14.4728 25.5095C14.1569 25.3516 13.9199 24.9567 14.0779 24.6408C14.1568 24.4038 14.3148 24.2459 14.3938 24.1669C15.4994 23.0612 17.2369 21.3237 18.4216 20.1391C18.4216 19.9811 18.5006 19.9021 18.5796 19.8232Z" fill="black"/>
                    </svg>
               </button>
             </div>
           </li>`

    socialLinks.insertAdjacentHTML('beforeend', socialLink)
    initSelects()
    linkCount++

    const linkItems =  socialLinks.querySelectorAll('.socials-list__item')
    const currentLink = linkItems[linkItems.length - 1]

    currentLink.querySelector('.socials-list__delete-btn').addEventListener('click', (e) => {
      e.preventDefault()
      socialLinks.removeChild(currentLink)
      linkCount--
    })
  })
}


