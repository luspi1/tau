import { body, modalOverlay, modalPassport } from "../_vars";

const passportForm = document.querySelector('.passport-modal__form')


const passportData = {
  number: '',
  dateIssue: '',
  issuer: '',
  constantCity: '',
  constantIndex: '',
  constantAddress: '',
  temporaryCity: '',
  temporaryIndex: '',
  temporaryAddress: '',
  actualCity: '',
  actualIndex: '',
  actualAddress: '',
  typeRegistration: ''
}

// Обработка события отправки

if (passportForm) {
  passportForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const {
      passportNumber,
      dateIssue,
      issuer,
      constantCity,
      constantIndex,
      constantAddress,
      temporaryCity,
      temporaryIndex,
      temporaryAddress,
      typeReg,
      actualCity,
      actualIndex,
      actualAddress
    } = e.target.elements;

    passportData.number = passportNumber.value
    passportData.dateIssue = dateIssue.value
    passportData.issuer = issuer.value
    passportData.constantCity = constantCity.value
    passportData.constantIndex = constantIndex.value
    passportData.constantAddress = constantAddress.value
    passportData.temporaryCity = temporaryCity.value
    passportData.temporaryIndex = temporaryIndex.value
    passportData.temporaryAddress = temporaryAddress.value
    passportData.actualCity = actualCity.value
    passportData.actualIndex = actualIndex.value
    passportData.actualAddress = actualAddress.value
    passportData.typeRegistration = typeReg.value


    modalPassport.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')

  })
}


// Валидация

if (passportForm) {
  passportForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('passport-modal__input_active')
    } else {
      inputTarget.classList.remove('passport-modal__input_active')
    }
  })
}
