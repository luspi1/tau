// Появления списка элементов полученных от сервера в полях "Контрагент", "Исполнитель",
// "Наблюдатель"

import { closeSelectPopups, handlePopupInputs } from "../_functions";

const employeePopupInputs = document.querySelectorAll('.modal-new-employee__input')

if (employeePopupInputs) {
  employeePopupInputs.forEach(input => {
    input.addEventListener('input', handlePopupInputs)
  })
}

// закрытие попап-селектов

const employeesPage = document.querySelector('.page-employees')

closeSelectPopups(employeesPage)

