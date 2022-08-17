import { treatmentFullnameData, updateFullnameFields } from "../_functions";
import { modalOverlay, body, modalFullname } from "../_vars";

const editFullnameForm = document.querySelector('.modal-fullname__form')


export const fullNameData = {
  nominative: {
    lastname: '',
    name: '',
    patronymic: ''
  },
  genitive: {
    lastname: '',
    name: '',
    patronymic: ''
  },
  dative: {
    lastname: '',
    name: '',
    patronymic: ''
  },
}

const {nominative, genitive, dative} = fullNameData;

// Обработка события отправки

if (editFullnameForm) {
  editFullnameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const {
      nominativeLastname,
      nominativeName,
      nominativePatronymic,
      genitiveLastname,
      genitiveName,
      genitivePatronymic,
      dativeLastname,
      dativeName,
      dativePatronymic
    } = e.target.elements;
    nominative.name = nominativeName.value
    nominative.lastname = nominativeLastname.value
    nominative.patronymic = nominativePatronymic.value
    genitive.name = genitiveName.value
    genitive.lastname = genitiveLastname.value
    genitive.patronymic = genitivePatronymic.value
    dative.name = dativeName.value
    dative.lastname = dativeLastname.value
    dative.patronymic = dativePatronymic.value
    treatmentFullnameData(fullNameData)
    updateFullnameFields(nominative)
    modalFullname.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')
  })
}


// Валидация

if (editFullnameForm) {
  editFullnameForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    const currentErrorMessage = inputTarget.closest('.modal-fullname__item').querySelector('.error-message')
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
      currentErrorMessage.classList.add('_active')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
      currentErrorMessage.classList.remove('_active')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('modal-fullname__input_active')
    } else {
      inputTarget.classList.remove('modal-fullname__input_active')
    }
  })
}
