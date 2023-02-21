import { modalOverlay, loader, infoModal, bigImgModal } from "./_vars";

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
const formToObj = (formData) => {
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

// Функция показа модалки большой картинки

const showBigImgModal = (path) => {
  bigImgModal.classList.add('big-img-modal_active')
  bigImgModal.querySelector('img').src = path
  modalOverlay.classList.add('modal-overlay_active')
  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-overlay_active')
    bigImgModal.classList.remove('big-img-modal_active')
  })
}

// функция отправки данных с попапа

async function handlePopupSubmit(inputValue, popup, optionalInfo) {
  const inputData = inputValue

  const addData = popup.dataset.json
  const addDataObj = JSON.parse(addData)
  const submitScript = popup.dataset.script

  let totalData = {}

  if (optionalInfo) {
    totalData = {
      searchtext: inputData,
      ...optionalInfo,
      ...addDataObj
    }
  } else {
    totalData = {
      searchtext: inputData,
      ...addDataObj
    }
  }

  const totalDataJson = JSON.stringify(totalData)

  const response = await sendData(totalDataJson, submitScript)
  const finishedResponse = await response.json()

  const {status, errortext, html} = finishedResponse
  if (status === 'ok') {
    popup.classList.add('select-popup_active')
    const popupList = popup.querySelector('.select-popup__list')

    popupList.innerHTML = ''

    html.forEach(el => {
      popupList.insertAdjacentHTML('beforeend', el)
    })

  } else {
    showInfoModal(errortext)
  }
}

const handlePopupInputs = (e) => {
  let inputValue = e.target.value

  const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')
  if (inputValue.length > 2) {
    handlePopupSubmit(inputValue, targetSelectPopup)
      .then(() => {
        const popupElements = targetSelectPopup.querySelectorAll('li')
        if (popupElements) {
          popupElements.forEach(el => {
            el.addEventListener('click', () => {
              const targetInput = el.closest('.select-input-wrapper').querySelector('.select-popup-input')
              const dataInput = el.closest('.select-input-wrapper').querySelector('.select-popup-data')
              targetInput.value = el.textContent
              dataInput.value = el.dataset.id
              targetSelectPopup.classList.remove('select-popup_active')
            })
          })
        } else {
          targetSelectPopup.classList.remove('select-popup_active')
        }
      })
  }
}


// Закрытие попап-селектов по нажатию на другие элементы

const closeSelectPopups = (page) => {
  const siteContainer = page?.closest('.site-container')
  if (siteContainer) {
    siteContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('select-popup') && !e.target.classList.contains('select-popup-input')) {
        const popupSelects = siteContainer.querySelectorAll('.select-popup_active')
        popupSelects.forEach(popup => {
          popup.classList.remove('select-popup_active')
        })
      }
    })
  }
}

//блокировка инпутов
const blockFields = (inputsWrapper) => {
  if (inputsWrapper) {
    inputsWrapper.forEach(wrapper => {
      wrapper.classList.add('input_disabled')
      wrapper.querySelector('input').disabled = true
    })
  }
}

// Обрезка длинного текста на определенную длину


const cutString = (stringArray, stringLength) => {
  stringArray.forEach(str => {
    let cutLength = 0
    stringLength ? cutLength = stringLength : cutLength = +str.dataset.shear

    if (cutLength && cutLength < str.textContent.length) {
      str.textContent = `${str.textContent.substring(0, cutLength)}...`
    }
  })
}


const changePage = (selectors) => {
  if (selectors) {
    selectors.forEach(el => {
      el.addEventListener('change', (e) => {
        const selectLink = e.target.dataset.selectPage
        const selectValue = e.target.value
        localStorage.setItem('select-value', selectValue)
        window.location.href = `${selectLink}/${selectValue}`
      })
    })
  }
}

// переключение обязательных полей

const toggleRequiredFields = (reqInputs) => {
  if (reqInputs) {
    reqInputs.forEach(el => {
      if (el.dataset.required === 'true') {
        el.dataset.required = 'false'
        el.required = false
      } else {
        el.dataset.required = 'true'
        el.required = true
      }
    })
  }
}

export {
  removeClasses,
  sendData,
  serializeForm,
  toggleLoader,
  formToObj,
  showInfoModal,
  updateFields,
  showBigImgModal,
  handlePopupSubmit,
  handlePopupInputs,
  closeSelectPopups,
  blockFields,
  cutString,
  changePage,
  toggleRequiredFields
}
