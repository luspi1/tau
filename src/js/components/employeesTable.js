import { body, deleteEmployeeModal, jobChangeModal, modalOverlay } from "../_vars"
import { closePopup, sendData, showInfoModal }                     from "../_functions"


const EmployeesTypes = ['руководитель', 'менеджер', 'постоянный', 'временный']

const showJobChangeModal = ({name, direction, position}) => {
  jobChangeModal.classList.add('_active')
  modalOverlay.classList.add('modal-overlay_active')

  const jobModalName = jobChangeModal.querySelector('.modal-job-change__name')
  const jobModalPositionOld = jobChangeModal.querySelector('.modal-job-change__actual-position')
  const jobModalPositionNew = jobChangeModal.querySelector('.modal-job-change__new-position')

  jobModalName.textContent = name
  jobModalPositionOld.textContent = EmployeesTypes[position]

  if (direction === 0) {
    jobModalPositionNew.textContent = EmployeesTypes[position + 1]
  } else {
    jobModalPositionNew.textContent = EmployeesTypes[position - 1]
  }


  const cancelJobChangeBtn = jobChangeModal.querySelector('.modal-job-change__close-btn')
  closePopup(
    modalOverlay,
    cancelJobChangeBtn
  )

  // Отправки информации по нажатию "Изменить должность"

  const jobModalForm = jobChangeModal.querySelector('.modal-job-change__form')

  jobModalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
      id_person: 'some-id1221',
      id_unit: 'some-id75677',
      direction
    }

    const jsonData = JSON.stringify(data)
    const response = await sendData(jsonData, './data/getCases.txt')
    const finishedResponse = await response.json()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      jobChangeModal.classList.remove('_active')
      modalOverlay.classList.remove('modal-overlay_active')
      body.classList.remove('_lock')
      location.reload()
    } else {
      showInfoModal(errortext)
    }
  })
}

const showDeleteEmployeeModal = ({name, position}) => {
  deleteEmployeeModal.classList.add('_active')
  modalOverlay.classList.add('modal-overlay_active')

  const deleteEmployeeModalName = deleteEmployeeModal.querySelector('.modal-delete-employee__name')
  const deleteEmployeeModalPosition = deleteEmployeeModal.querySelector('.modal-delete-employee__position')

  deleteEmployeeModalName.textContent = name
  deleteEmployeeModalPosition.textContent = EmployeesTypes[position]


  const cancelDeleteEmployeeBtn = deleteEmployeeModal.querySelector('.modal-delete-employee__close-btn')
  closePopup(
    modalOverlay,
    cancelDeleteEmployeeBtn
  )

  // Отправки информации по нажатию "Удалить"

  const deleteEmployeeForm = deleteEmployeeModal.querySelector('.modal-delete-employee__form')

  deleteEmployeeForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
      id_person: 'some-id1221',
      id_unit: 'some-id75677',
    }

    const jsonData = JSON.stringify(data)
    const response = await sendData(jsonData, './data/getCases.txt')
    const finishedResponse = await response.json()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      deleteEmployeeModal.classList.remove('_active')
      modalOverlay.classList.remove('modal-overlay_active')
      body.classList.remove('_lock')
      location.reload()
    } else {
      showInfoModal(errortext)
    }
  })
}

// Функция для сбора данных из строки сотрудника в один объект "employeeObj"
const collectEmployeeInfo = (target, employeeObj, directionNumb) => {
  const targetLine = target.closest('.employees-table__row')
  employeeObj.position = EmployeesTypes.indexOf(targetLine.querySelector('.employees-table__spot').textContent.trim())
  employeeObj.regDate = targetLine.querySelector('.employees-table__date span').textContent.trim()
  employeeObj.name = targetLine.querySelector('.employees-table__name').textContent.trim()
  if (directionNumb) {
    employeeObj.direction = directionNumb
  }
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

      if (target.classList.contains('employees-table__btn-up')) {
        collectEmployeeInfo(target, employeeInfo, 1)
        showJobChangeModal(employeeInfo)
      }

      if (target.classList.contains('employees-table__btn-down')) {
        collectEmployeeInfo(target, employeeInfo, 0)
        showJobChangeModal(employeeInfo)
      }
    })
  })
}

