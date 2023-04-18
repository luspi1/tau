import { sendData, showInfoModal }                                 from "../_functions"
import { body, deleteEmployeeModal, jobChangeModal, modalOverlay } from "../_vars"


const showJobChangeModal = ({name, direction, position, newPosition, id}) => {
  jobChangeModal.classList.add('_active')
  modalOverlay.classList.add('modal-overlay_active')

  const jobModalName = jobChangeModal.querySelector('.modal-job-change__name')
  const jobModalPositionOld = jobChangeModal.querySelector('.modal-job-change__actual-position')
  const jobModalPositionNew = jobChangeModal.querySelector('.modal-job-change__new-position')

  jobModalName.textContent = name
  jobModalPositionOld.textContent = position
  jobModalPositionNew.textContent = newPosition


  // Отправки информации по нажатию "Изменить должность"

  const jobModalForm = jobChangeModal.querySelector('.modal-job-change__form')
  const changeEmployeeUrl = jobModalForm.dataset.url

  const changeJobSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id_person: id, direction
    }

    const jsonData = JSON.stringify(data)
    try {
      const response = await sendData(jsonData, changeEmployeeUrl)
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        jobChangeModal.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        body.classList.remove('_lock')
        jobModalForm.removeEventListener('submit', changeJobSubmit)
        location.reload()
      } else {
        jobModalForm.removeEventListener('submit', changeJobSubmit)
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  jobModalForm.addEventListener('submit', changeJobSubmit)
}

const showDeleteEmployeeModal = ({name, position, id, row}) => {
  deleteEmployeeModal.classList.add('_active')
  modalOverlay.classList.add('modal-overlay_active')

  const deleteEmployeeModalName = deleteEmployeeModal.querySelector('.modal-delete-employee__name')
  const deleteEmployeeModalPosition = deleteEmployeeModal.querySelector('.modal-delete-employee__position')

  deleteEmployeeModalName.textContent = name
  deleteEmployeeModalPosition.textContent = position


  // Отправки информации по нажатию "Удалить"

  const deleteEmployeeForm = deleteEmployeeModal.querySelector('.modal-delete-employee__form')
  const deleteEmployeeUrl = deleteEmployeeForm.dataset.url

  const deleteEmployeeSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id_unit_person: id
    }

    const jsonData = JSON.stringify(data)
    try {
      const response = await sendData(jsonData, deleteEmployeeUrl)
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        deleteEmployeeModal.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        body.classList.remove('_lock')
        row.remove()
        deleteEmployeeForm.removeEventListener('submit', deleteEmployeeSubmit)
      } else {
        deleteEmployeeForm.removeEventListener('submit', deleteEmployeeSubmit)
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }


  deleteEmployeeForm.addEventListener('submit', deleteEmployeeSubmit)
}

// Функция для сбора данных из строки сотрудника в один объект "employeeObj"
const collectEmployeeInfo = (target, employeeObj) => {
  const targetLine = target.closest('.employees-table__row')
  employeeObj.position = target.dataset.current
  employeeObj.newPosition = target.dataset.next
  employeeObj.direction = target.dataset.direction
  employeeObj.name = targetLine.querySelector('.employees-table__name').textContent.trim()
  employeeObj.id = targetLine.dataset.id
  employeeObj.row = targetLine
}


const employees = document.querySelectorAll('.page-employees__table .employees-table__row')

if (employees) {
  const employeeInfo = {}

  employees.forEach(employee => {
    employee.addEventListener('click', ({target}) => {

      if (target.classList.contains('employees-table__btn-close')) {
        collectEmployeeInfo(target, employeeInfo)
        showDeleteEmployeeModal(employeeInfo)
      }

      if (target.classList.contains('employees-table__btn-up') || target.classList.contains('employees-table__btn-down')) {
        collectEmployeeInfo(target, employeeInfo)
        showJobChangeModal(employeeInfo)
      }
    })
  })
}

