import { body, modalOverlay, loader, infoModal } from "./_vars";

// Функция закрытия модалок, принимает элементы, по нажатию на которые модалки закроются
const closePopup = (...clickTarget) => {
  const foundedTargets = clickTarget.filter(el => el)
  foundedTargets.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.classList.contains('_active')) {
        modal.classList.remove('_active')
      }
    })
    modalOverlay.classList.remove('modal-overlay_active')
  }))
}

// Функция очистки классов, принимает класс, который будет удален отовсюду
const removeClasses = (className) => {
  const classArr = document.querySelectorAll(`.${className}`)
  classArr.forEach(el => el.classList.remove(className))
}


// Фунцкия отправки fetch запросов
async function sendData(data, url) {
  return await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: data,
  })
}

// Обновление полей по дата-атрибуту

const updateFields = (inputsObj, updatableFields) => {
  updatableFields.forEach(field => {
    field.textContent = inputsObj[field.dataset.updfield]
  })
}


//Сбор данных форм

const serializeForm = (formNode) => {
  return new FormData(formNode)
}

// Преобразование formData в объект
const formToObj = (formData) =>  {
  return Array.from(formData.entries()).reduce((memo, pair) => ({
    ...memo,
    [pair[0]]: pair[1],
  }), {})
}



// показ/скрытие модалки ошибки

const toggleLoader = () => {
  loader.classList.toggle('hidden')
}

const showInfoModal = (responseText) => {
  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('info-modal')) {
      infoModal.classList.add('hidden')
    }

  })
  const modalText = infoModal.querySelector('.info-modal__content-text')
  modalText.textContent = responseText
  infoModal.classList.remove('hidden')
}


export {
  closePopup,
  removeClasses,
  sendData,
  serializeForm,
  toggleLoader,
  formToObj,
  showInfoModal,
  updateFields,
}
