import { body, modalOverlay } from "./_vars";

// Функция закрытия модалок, принимает элементы, по нажатию на которые модалки закроются
const closePopup = (...clickTarget) => {
  clickTarget.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.classList.contains('_active')) {
        modal.classList.remove('_active')
      }
    })
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')
  }))
}

// Функция обработки данных ФИО
const treatmentFullnameData = (dataObject) => {
  Object.keys(dataObject).forEach(key => {
    if (dataObject[key].lastname) {
      dataObject[key].lastname = dataObject[key].lastname[0].toUpperCase() +
        dataObject[key].lastname.toLowerCase().substring(1)
    }
    if (dataObject[key].name) {
      dataObject[key].name = dataObject[key].name[0].toUpperCase() +
        dataObject[key].name.toLowerCase().substring(1)
    }
    if (dataObject[key].patronymic) {
      dataObject[key].patronymic = dataObject[key].patronymic[0].toUpperCase() +
        dataObject[key].patronymic.toLowerCase().substring(1)
    }
  })
}

// Функция обновления полей, связанных с ФИО
const updateFullnameFields = (nominative) => {
  document.querySelector('.prime-info__name').innerHTML =
    `${nominative.lastname}<br>${nominative.name} ${nominative.patronymic}`
  document.querySelector('.bank__recipient-value').textContent =
    `${nominative.lastname} ${nominative.name} ${nominative.patronymic}`
  document.querySelector('.account-link span').innerHTML = nominative.lastname
}

// Функция очистки классов, принимает класс, который будет удален отовсюду
const removeClasses = (className) => {
  const classArr = document.querySelectorAll(`.${className}`)
  classArr.forEach(el => el.classList.remove(className))
}

// Функция записи основной информации из инпута в объект данных
const writeGeneralData = (input, dataObject) => {
  dataObject[input.dataset.input] = input.value
}

// Функция обновления полей, связанных с основной информацией
const updateGeneralFields = (input, dataObject) => {
  const allUpdateFiels = document.querySelectorAll(`[data-value=${input.dataset.input}]`)
  if (allUpdateFiels) {
    allUpdateFiels.forEach(field => {
      field.textContent = dataObject[field.dataset.value]
    })
  }
}


export {
  closePopup,
  treatmentFullnameData,
  updateFullnameFields,
  removeClasses,
  writeGeneralData,
  updateGeneralFields
}
