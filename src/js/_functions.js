import { bigImgModal, checkConfirmModal, infoModal, loader, modalOverlay } from "./_vars"

// Функция очистки классов, принимает класс, который будет удален отовсюду
export const removeClasses = (className) => {
  const classArr = document.querySelectorAll(`.${className}`)
  classArr.forEach(el => el.classList.remove(className))
}


// Фунцкия отправки fetch запросов
export async function sendData(data, url) {

  // установка времени прерывания запроса
  let controller = new AbortController()
  setTimeout(() => controller.abort(), 6000)

  return await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: data,
    signal: controller.signal
  })
}

// Обновление полей по дата-атрибуту

export const updateFields = (inputsObj, updatableFields) => {
  updatableFields.forEach(field => {
    field.textContent = inputsObj[field.dataset.updfield]
  })
}


//Сбор данных форм

export const serializeForm = (formNode) => {
  return new FormData(formNode)
}

// Преобразование formData в объект
export const formToObj = (formData) => {
  return Array.from(formData.entries()).reduce((memo, pair) => ({
    ...memo,
    [pair[0]]: pair[1],
  }), {})
}


// показ/скрытие модалки ошибки

export const toggleLoader = () => {
  loader.classList.toggle('hidden')
}

export const showInfoModal = (responseText) => {
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

export const showBigImgModal = (path) => {
  bigImgModal.classList.add('big-img-modal_active')
  bigImgModal.querySelector('img').src = path
  modalOverlay.classList.add('modal-overlay_active')
  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-overlay_active')
    bigImgModal.classList.remove('big-img-modal_active')
  })
}

// функция отправки данных с попапа

export async function handlePopupSubmit(inputValue, popup, optionalInfo) {
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

  try {
    const response = await sendData(totalDataJson, submitScript)
    const finishedResponse = await response.json()

    const {status, errortext, html} = finishedResponse
    if (status === 'ok') {
      popup.classList.add('select-popup_active')
      const popupList = popup.querySelector('.select-popup__list')
      popupList.innerHTML = ''
      html?.forEach(el => {
        popupList.insertAdjacentHTML('beforeend', el)
      })
    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal("Во время выполнения запроса произошла ошибка")
    console.error(err)
  }
}

export const handlePopupInputs = (e) => {
  let inputValue = e.target.value
  const targetInput = e.target.closest('.select-input-wrapper').querySelector('.select-popup-input')
  let dataInput = e.target.closest('.select-input-wrapper').querySelector('.select-popup-data')
  const targetSelectPopup = e.currentTarget.closest('.select-input-wrapper').querySelector('.select-popup')

  dataInput.value = ''

  if (inputValue.length > 2) {
    handlePopupSubmit(inputValue, targetSelectPopup)
      .then(() => {
        const popupElements = targetSelectPopup.querySelectorAll('li')
        if (popupElements) {
          popupElements.forEach(el => {
            el.addEventListener('click', () => {
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

export const closeSelectPopups = (page) => {
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
export const blockFields = (inputsWrapper) => {
  if (inputsWrapper) {
    inputsWrapper.forEach(wrapper => {
      wrapper.classList.add('input_disabled')
      wrapper.querySelector('input').disabled = true
    })
  }
}

// Обрезка длинного текста на определенную длину


export const cutString = (stringArray, stringLength) => {
  stringArray.forEach(str => {
    let cutLength = 0
    stringLength ? cutLength = stringLength : cutLength = +str.dataset.shear

    if (cutLength && cutLength < str.textContent.length) {
      str.textContent = `${str.textContent.substring(0, cutLength)}...`
    }
  })
}


export const changePage = (selectors) => {
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

export const toggleRequiredFields = (reqInputs) => {
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

// проверка наличия значение в инпутах
export const checkValue = (checkClasses) => {
  let isValue = true
  let checkInputs

  if (typeof checkClasses === 'string') {
    checkInputs = document.querySelectorAll(checkClasses)
  } else {
    checkInputs = checkClasses
  }
  checkInputs.forEach(el => {
    if (!el.value.trim()) {
      isValue = false
    }
  })
  return isValue
}

//преобразование строки в HTML элемент

export const parseStringToHtml = (string, endElement) => {
  return new DOMParser().parseFromString(string, "text/html").querySelector(endElement)
}


// функция появления/скрытия модалки подтверждения. Возвращает true/false (подтверждено или нет)

export const checkConfirm = (confirmFunc, textConfirm) => {
  if (checkConfirmModal) {
    if (textConfirm) {
      const confirmDesc = checkConfirmModal.querySelector('.check-confirm-modal__content-text')
      confirmDesc.textContent = textConfirm
    }
    checkConfirmModal.classList.remove('hidden')
    const handleClickConfirm = (e) => {
      e.preventDefault()
      if (e.target.classList.contains('check-confirm-modal') || e.target.classList.contains('_cancel')) {
        checkConfirmModal.classList.add('hidden')
        checkConfirmModal.removeEventListener('click', handleClickConfirm)
      }
      if (e.target.classList.contains('_confirm')) {
        checkConfirmModal.classList.add('hidden')
        confirmFunc()
        checkConfirmModal.removeEventListener('click', handleClickConfirm)
      }
    }
    checkConfirmModal.addEventListener('click', handleClickConfirm)
  }
}


// переключение открытия/закрытия платежа на income.html
export const togglePaymentState = (checkBtn, closeBtn) => {
  if (checkBtn && closeBtn) {
    if (checkBtn.classList.contains('red')) {
      checkBtn.classList.remove('red')
      checkBtn.classList.add('green')
      closeBtn.textContent = 'Открыть платеж'
      closeBtn.style.color = '#0CB477'
    } else {
      checkBtn.classList.remove('green')
      checkBtn.classList.add('red')
      closeBtn.textContent = 'Закрыть платеж'
      closeBtn.style.color = '#bc0d48'
    }
  }
}

// Управление активностью кнопки при переключениях в кастомных селектах.
// при value = 'none' кнопка не активна
export const manageActivitySubmitBtn = (select, activityBtn) => {
  if (select && activityBtn) {
    select.addEventListener('change', (e) => {
      if (e.detail.value === 'none') {
        activityBtn.classList.add('btn_disabled')
      } else {
        activityBtn.classList.remove('btn_disabled')
      }
    })
  }
}

// сброс селекта к изначальному состоянию

export const resetSelect = (select, activityBtn) => {
  if (select && activityBtn) {
    const resetPlaceholder = select.querySelector('.choices__item--selectable')
    const selectPlaceholder = select.querySelector('.choices__list[role="listbox"]').firstElementChild
    resetPlaceholder.textContent = selectPlaceholder.textContent
    activityBtn.classList.add('btn_disabled')
  }
}

// отключаем прокрутку цифр в инпуте

const inputTypeNumbers = document.querySelectorAll('input[type="number"]')
if (inputTypeNumbers) {
  inputTypeNumbers.forEach(input => {
    input.addEventListener('wheel', (e) => {
      e.preventDefault()
    })
  })
}

// функция обновления полей по вводу значений в инпут

export const updateFieldOnInput = (input, field) => {
  input.addEventListener('input', (e) => {
    field.textContent = e.target.value
  })
}


// сортировка по дате и времени одновременно

const sortDateAndTime = (arrSort, reverse) => {
  let resultArr = []
  resultArr = arrSort.sort((a, b) => {
    const dateA = a.dataset.sortDate?.split(',')[0].split('.').reverse()
    const dateB = b.dataset.sortDate?.split(',')[0].split('.').reverse()
    const timeA = a.dataset.sortDate?.split(',')[1].split('.')
    const timeB = b.dataset.sortDate?.split(',')[1].split('.')
    const resultA = [...dateA, ...timeA].join('')
    const resultB = [...dateB, ...timeB].join('')
    if (reverse) {
      return resultA - resultB
    } else {
      return resultB - resultA
    }
  })
  return resultArr

}


// функция сортировки по дате и по алфавиту
export const sortArr = (sortValue, sortArr, sortList) => {

  let sortedArr = []


  let isTime = sortArr[1]?.dataset.sortDate.split(',').length > 1


  switch (sortValue) {
    case 'dateNew' :
      if (isTime) {
        sortedArr = sortDateAndTime(sortArr)
      } else {
        sortedArr = sortArr.sort((a, b) => {
          const dateA = a.dataset.sortDate?.split('.').reverse().join('')
          const dateB = b.dataset.sortDate?.split('.').reverse().join('')
          return dateB - dateA
        })
      }
      sortList.append(...sortedArr)
      break
    case 'dateOld' :
      if (isTime) {
        sortedArr = sortDateAndTime(sortArr, true)
      } else {
        sortedArr = sortArr.sort((a, b) => {
          const dateA = a.dataset.sortDate.split('.').reverse().join('')
          const dateB = b.dataset.sortDate.split('.').reverse().join('')
          return dateA - dateB
        })
      }
      sortList.append(...sortedArr)
      break
    case 'dateNew1' :
      if (isTime) {
        sortedArr = sortDateAndTime(sortArr)
      } else {
        sortedArr = sortArr.sort((a, b) => {
          const dateA = a.dataset.sortDate1?.split('.').reverse().join('')
          const dateB = b.dataset.sortDate1?.split('.').reverse().join('')
          return dateB - dateA
        })
      }
      sortList.append(...sortedArr)
      break
    case 'dateOld1' :
      if (isTime) {
        sortedArr = sortDateAndTime(sortArr, true)
      } else {
        sortedArr = sortArr.sort((a, b) => {
          const dateA = a.dataset.sortDate1.split('.').reverse().join('')
          const dateB = b.dataset.sortDate1.split('.').reverse().join('')
          return dateA - dateB
        })
      }
      sortList.append(...sortedArr)
      break
    case 'abcDecr' :
      sortedArr = sortArr.sort((a, b) => a.dataset.sortName.localeCompare(b.dataset.sortName))
      sortList.append(...sortedArr)
      break
    case 'abcIncr' :
      sortedArr = sortArr.sort((a, b) => b.dataset.sortName.localeCompare(a.dataset.sortName))
      sortList.append(...sortedArr)
      break
    case 'abcDecr1' :
      sortedArr = sortArr.sort((a, b) => a.dataset.sortName1.localeCompare(b.dataset.sortName1))
      sortList.append(...sortedArr)
      break
    case 'abcIncr1' :
      sortedArr = sortArr.sort((a, b) => b.dataset.sortName1.localeCompare(a.dataset.sortName1))
      sortList.append(...sortedArr)
      break
    case 'abcDecr2' :
      sortedArr = sortArr.sort((a, b) => a.dataset.sortName2.localeCompare(b.dataset.sortName2))
      sortList.append(...sortedArr)
      break
    case 'abcIncr2' :
      sortedArr = sortArr.sort((a, b) => b.dataset.sortName2.localeCompare(a.dataset.sortName2))
      sortList.append(...sortedArr)
      break
    case 'abcDecr3' :
      sortedArr = sortArr.sort((a, b) => a.dataset.sortName3.localeCompare(b.dataset.sortName3))
      sortList.append(...sortedArr)
      break
    case 'abcIncr3' :
      sortedArr = sortArr.sort((a, b) => b.dataset.sortName3.localeCompare(a.dataset.sortName3))
      sortList.append(...sortedArr)
      break

    default :
      sortedArr = sortArr.sort((a, b) => a.dataset.sortName.localeCompare(b.dataset.sortName))
      sortList.append(...sortedArr)
      break
  }
}
