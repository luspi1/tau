import { modalOverlay } from "../_vars";
import { closePopup } from "../_functions";

const cancelFullnameBtn = document.querySelector('.modal-fullname__close-btn')
const cancelSocialsBtn = document.querySelector('.modal-socials__close-btn')
const cancelPassportBtn = document.querySelector('.passport-modal__close-btn')
const cancelRequisitesBtn = document.querySelector('.modal-requisites__close-btn')
const cancelNewContactBtn = document.querySelector('.new-contact__close-btn')

const editFullnameBtn = document.querySelector('.edit-fullname')
const editSocialsBtn = document.querySelector('.edit-socials')
const editPassportBtn = document.querySelector('.edit-passport')
const editRequisitesBtn = document.querySelector('.edit-requisites')
const createNewContactBtn = document.querySelector('.page-contacts__create-contact-btn')
const connectLeaderBtn = document.querySelector('.edit-contact__connect-leader-btn')

// Управление состоянием модалок
const manageModals = (...editButtons) => {
  editButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        const btnCurrentModal = btn.dataset.modal
        document.querySelector(`#${btnCurrentModal}`).classList.add('_active')
        modalOverlay.classList.add('modal-overlay_active')
        closePopup(modalOverlay, cancelFullnameBtn, cancelPassportBtn, cancelSocialsBtn, cancelRequisitesBtn, cancelNewContactBtn)
      })
    }
  })
}

manageModals(editFullnameBtn, editSocialsBtn, editPassportBtn, editRequisitesBtn, createNewContactBtn, connectLeaderBtn)






