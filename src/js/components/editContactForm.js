import Choices                                   from "choices.js"
import { sendData, showInfoModal, toggleLoader } from "../_functions"


const editContactForm = document.querySelector('.edit-contact .edit-contact__form')
const editContactSelect = document.querySelector('.edit-contact .edit-contact__contact-type-btn')
const entityRequiredFields = document.querySelectorAll('.edit-contact input[data-required="entity"]')
const entityIndividualFields = document.querySelectorAll('.edit-contact input[data-required="individual"]')


// Переключение обязательных полей в зависимости от типа контакта


const toggleFieldsSelect = document.querySelector('.edit-contact__contact-type-btn')

if (toggleFieldsSelect) {
  const editContactChoices = new Choices(toggleFieldsSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  })

  const toggleRequiredFields = (typeFields) => {
    editContactChoices.setChoiceByValue(typeFields)

    if (typeFields === 'entity') {
      entityIndividualFields.forEach(el => {
        el.required = false
      })
      entityRequiredFields.forEach(el => {
        el.required = true
      })
      return
    }
    entityRequiredFields.forEach(el => {
      el.required = false
    })
    entityIndividualFields.forEach(el => {
      el.required = true
    })
  }


  toggleRequiredFields(editContactForm.dataset.contact)

// Переключения контента формы в зависимости от типа контакта

  const typeSelect = document.querySelector('.edit-contact__contact-type-btn')

  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      toggleRequiredFields(e.target.value)
      editContactForm.dataset.contact = e.target.value
    })
  }

}


// Обработка события отправки

if (editContactForm) {

  const contragentSubmitBtn = document.querySelector('.edit-contact .contragent-btn')
  const dataUrl = contragentSubmitBtn.dataset.url

  async function handleContragentSubmit(event) {
    event.preventDefault()
    const objData = {
      id_contact: event.submitter.dataset.id
    }
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        showInfoModal('Контакт успешно сделан контрагентом')
      } else {
        showInfoModal(errortext)
      }
    } catch {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
    editContactForm.removeEventListener('submit', handleContragentSubmit)
  }

  if (contragentSubmitBtn) {
    contragentSubmitBtn.addEventListener('click', () => {
      editContactForm.addEventListener('submit', handleContragentSubmit)
    })
  }


  // Логика radio btn совпадений адресов

  const contactRadioBtns = editContactForm.querySelectorAll('.edit-contact__checkbox')

  const setMatches = (setInputs, radioType) => {
    let inputsOnType
    switch (radioType) {
      case 'juristic':
        inputsOnType = editContactForm.querySelectorAll('.edit-contact__juristic-type .edit-contact__input')
        break
      case 'mail':
        inputsOnType = editContactForm.querySelectorAll('.edit-contact__mail-type .edit-contact__input')
        break
      case 'empty':
        inputsOnType = []
    }

    setInputs?.forEach((el, i) => {
      if (inputsOnType[i]?.value) {
        el.value = inputsOnType[i].value
      } else {
        el.value = ''
      }
    })
  }


  contactRadioBtns.forEach(el => {
    el.addEventListener('input', (e) => {

      let setInputs = e.target.closest('.edit-contact__item')?.querySelectorAll('.edit-contact__input')

      switch (e.target.value) {
        case 'isMatchesJuristic' :
          setMatches(setInputs, 'juristic')
          break
        case 'isMatchesMail' :
          setMatches(setInputs, 'mail')
          break
        default :
          setMatches(setInputs, 'empty')
          break
      }

    })
  })

}


// Смена длинных placeholder на малых разрешениях
const contactInputFullname = document.querySelector('input[name="editContactFullname"]')
const mediaQuery = window.matchMedia('(max-width: 768px)')


function handleTabletChange(e) {
  if (e.matches) {
    contactInputFullname.placeholder = 'ООО «Название организации»'
  }
}

if (contactInputFullname) {
  mediaQuery.addListener(handleTabletChange)
  handleTabletChange(mediaQuery)
}




