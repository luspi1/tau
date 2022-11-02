import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader
} from "../_functions";
import Choices from "choices.js";


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
  });

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


  async function handleContragentSubmit (event) {
    event.preventDefault()
    const objData = {
      id_contact: event.submitter.dataset.id
    }
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    const response = await sendData(jsonData, '/include/ajax/make_contragent.php')
    const finishedResponse = await response.json()

    toggleLoader()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      showInfoModal('Контакт успешно сделан контрагентом')
    } else {
      showInfoModal(errortext)
    }
    editContactForm.removeEventListener('submit', handleContragentSubmit)
  }

  if (contragentSubmitBtn) {
    contragentSubmitBtn.addEventListener('click', () => {
      editContactForm.addEventListener('submit', handleContragentSubmit)
    })
  }
}


// Смена длинных placeholder на малых разрешениях
const contactInputFullname = document.querySelector('input[name="editContactFullname"]')
const mediaQuery = window.matchMedia('(max-width: 768px)')


function handleTabletChange (e) {
  if (e.matches) {
    contactInputFullname.placeholder = 'ООО «Название организации»'
  }
}

if (contactInputFullname) {
  mediaQuery.addListener(handleTabletChange)
  handleTabletChange(mediaQuery)
}












