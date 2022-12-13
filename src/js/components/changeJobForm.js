import { modalOverlay } from "../_vars";
import { closePopup } from "../_functions";

const employeesList = document.querySelector('.page-employees__table')
const jobChangeModal = document.querySelector('#job-change-modal')
const deleteEmployeeModal = document.querySelector('#delete-employee-modal')

if (employeesList) {
  employeesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('employees-table__change-job-btn')) {
      jobChangeModal.classList.add('_active')
      modalOverlay.classList.add('modal-overlay_active')
      const cancelJobChangeBtn = jobChangeModal.querySelector('.modal-job-change__close-btn')
      closePopup(
        modalOverlay,
        cancelJobChangeBtn
      )
    }

    if (e.target.classList.contains('employees-table__delete-employee-btn')) {
      deleteEmployeeModal.classList.add('_active')
      modalOverlay.classList.add('modal-overlay_active')
      const cancelDeleteEmployeeBtn = deleteEmployeeModal.querySelector('.modal-delete-employee__close-btn')
      closePopup(
        modalOverlay,
        cancelDeleteEmployeeBtn
      )
    }
  })
}
