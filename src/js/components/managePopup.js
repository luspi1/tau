import { body, modalOverlay } from "../_vars";
import { closePopup } from "../_functions";

const cancelFullnameBtn = document.querySelector('.modal-fullname__close-btn')
const cancelSocialsBtn = document.querySelector('.modal-socials__close-btn')

const editFullnameBtn = document.querySelector('.edit-fullname')
const editSocialsBtn = document.querySelector('.edit-socials')

// Управление состоянием модалок
const manageModals = (...editButtons) => {

  editButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        btn.closest('.edit-modal').querySelector('.modal').classList.add('_active')
        modalOverlay.classList.add('modal-overlay_active')
        body.classList.add('_lock')
        closePopup(modalOverlay, cancelFullnameBtn, cancelSocialsBtn)
      })
    }
  })
}

manageModals(editFullnameBtn, editSocialsBtn)





