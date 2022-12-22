 import { modalOverlay } from "../_vars";
import { closePopup } from "../_functions";

const cancelFullnameBtn = document.querySelector('.modal-fullname__close-btn')
const cancelSocialsBtn = document.querySelector('.modal-socials__close-btn')
const cancelPassportBtn = document.querySelector('.passport-modal__close-btn')
const cancelRequisitesBtn = document.querySelector('.modal-requisites__close-btn')
const cancelNewContactBtn = document.querySelector('.new-contact__close-btn')
const cancelEditCardBtn = document.querySelector('.modal-edit-card__close-btn')
const cancelEditInvoiceBtn = document.querySelector('.modal-edit-invoice__close-btn')
const cancelNewEmployeeBtn = document.querySelector('.modal-new-employee__close-btn')
const cancelComingBtn = document.querySelector('.income-page .modal-incoming__close-btn')
const cancelLetterBtn = document.querySelector('.modal-create-letter__close-btn')
const cancelCounterpartyAlertBtn = document.querySelector('.modal-counterparty-alert__close-btn')
const cancelSubjectBtn = document.querySelector('.modal-contract__close-subject')
const cancelConfidentialBtn = document.querySelector('.modal-contract__close-confidential')
const cancelAppBtn = document.querySelector('.modal-contract__close-app')
const cancelCopyCase = document.querySelector('.modal-copy-case__close-btn')
const cancelNotAccess = document.querySelector('#not-access-modal .modal-not-access__close-btn')




const editFullnameBtn = document.querySelector('.edit-fullname')
const editSocialsBtn = document.querySelector('.edit-socials')
const editPassportBtn = document.querySelector('.edit-passport')
const editRequisitesBtn = document.querySelector('.edit-requisites')
const createNewContactBtn = document.querySelector('.page-contacts__create-contact-btn')
const connectLeaderBtn = document.querySelector('.edit-contact__connect-leader-btn')
const editInvoiceBtn = document.querySelector('.payments-page .btn-add-score')
const editCardBtn = document.querySelector('.payments-page .btn-add-card')
const newEmployeeBtn = document.querySelector('.page-employees__new-employees-link')
const comingBtns = document.querySelectorAll('.income-page .months__button')
const joinDirector = document.querySelector('.join-director__btn')
const createLetterBtn = document.querySelector('.correspondence .newmail-btn')
const editLetterBtn = document.querySelector('.correspondence-item .newmail-one__btn')
const counterpartyAlertBtn = document.querySelector('.create-deal-page' +
  ' .create-deal-caption__counterparty-btn')
const contractSubjectBtn = document.querySelector('.contract__btn-subject')
const contractConfidentialBtn = document.querySelector('.contract__btn-confidential')
const contractAppBtn = document.querySelector('.contract__btn-app')
const copyCaseBtn = document.querySelector('.create-case-page__copy-case-btn')
const notAccessBtn = document.querySelector('.test-page__not-access-btn')

// Управление состоянием модалок
const manageModals = (...editButtons) => {
  editButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        const btnCurrentModal = btn.dataset.modal
        const currentPageMain = btn.closest('main')
        const currentModal = document.querySelector(`#${btnCurrentModal}`)

        currentPageMain.style.minHeight = `${currentModal.clientHeight}px`
        currentModal.classList.add('_active')
        modalOverlay.classList.add('modal-overlay_active')
        closePopup(
          modalOverlay,
          cancelFullnameBtn,
          cancelPassportBtn,
          cancelSocialsBtn,
          cancelRequisitesBtn,
          cancelNewContactBtn,
          cancelEditCardBtn,
          cancelEditInvoiceBtn,
          cancelNewEmployeeBtn,
          cancelComingBtn,
          cancelLetterBtn,
          cancelCounterpartyAlertBtn,
          cancelSubjectBtn,
          cancelConfidentialBtn,
          cancelAppBtn,
          cancelCopyCase,
          cancelNotAccess
        )
      })
    }
  })
}

manageModals(
  editFullnameBtn,
  editSocialsBtn,
  editPassportBtn,
  editRequisitesBtn,
  createNewContactBtn,
  connectLeaderBtn,
  editInvoiceBtn,
  editCardBtn,
  newEmployeeBtn,
  ...comingBtns,
  joinDirector,
  createLetterBtn,
  editLetterBtn,
  counterpartyAlertBtn,
  contractSubjectBtn,
  contractConfidentialBtn,
  contractAppBtn,
  copyCaseBtn,
  notAccessBtn
)






