import Inputmask from "inputmask"

const phoneInput = document.querySelector('.prime-info__phone-input input')

if (phoneInput) {
  Inputmask({
    "mask": "+7 999 999-99-99",
    showMaskOnHover: false
  }).mask(phoneInput)
}

const passportInput = document.querySelector('.passport-modal__series-input')

if (passportInput) {
  Inputmask({
    "mask": "9999 999999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(passportInput)
}

const datePassportInput = document.querySelector('.passport-modal__date-input')

if (datePassportInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(datePassportInput)
}

const codePassportInput = document.querySelector('.passport-modal__code-input')

if (codePassportInput) {
  Inputmask({
    "mask": "999-999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(codePassportInput)
}


const datePrimeInput = document.querySelector('.prime-info__date-input .edit-input')

if (datePrimeInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(datePrimeInput)
}

const contactPhone = document.querySelector('.new-contact__phone-input')

if (contactPhone) {
  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(contactPhone)
}

const editContactPhoneInputs = document.querySelectorAll('.edit-contact__phones .edit-contact__input')

editContactPhoneInputs.forEach(el => {
  if (el) {
    Inputmask({
      "mask": "+7 (999) 999-99-99",
      showMaskOnHover: false
    }).mask(el)
  }
})


const newOrganizationPhoneInputs = document.querySelectorAll('.new-organization__phones .new-organization__input')


newOrganizationPhoneInputs.forEach(el => {
  if (el) {
    Inputmask({
      "mask": "+7 (999) 999-99-99",
      showMaskOnHover: false
    }).mask(el)
  }
})


// Пасспортные данные на странице редактирования контакта

const physPassportInput = document.querySelector('.edit-contact input[name="physNumberPassport"]')

if (physPassportInput) {
  Inputmask({
    "mask": "9999 999999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(physPassportInput)
}
const physDatePassportInput = document.querySelector('.edit-contact' +
  ' input[name="physDatePassport"]')
if (physDatePassportInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(physDatePassportInput)
}

const physCodePassportInput = document.querySelector('.edit-contact' +
  ' input[name="physCodePassport"]')
if (physCodePassportInput) {
  Inputmask({
    "mask": "999-999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(physCodePassportInput)
}


// Снилс на странице документов


const snilsInput = document.querySelector('.page-doc__snils-input input')

if (snilsInput) {
  Inputmask({
    "mask": "999-999-999 99",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(snilsInput)
}


// Дата платежа на странице создания кейса


const initDatePaymentsMask = () => {
  const datePayments = document.querySelectorAll('.create-case-page__date-input')

  datePayments.forEach(el => {
    Inputmask({
      "mask": "99.99.9999",
      showMaskOnHover: false,
      showMaskOnFocus: false,
    }).mask(el)
  })

}

initDatePaymentsMask()


// Даты на странице создания сделки

const initDateDealMask = () => {
  const createDealDate = document.querySelectorAll('.create-deal-page__date-input')

  createDealDate.forEach(el => {
    Inputmask({
      "mask": "99.99.9999",
      showMaskOnHover: false,
      showMaskOnFocus: false,
    }).mask(el)
  })
}
initDateDealMask()


// Номер карты в модалке редактирования карты

const cardNumberInput = document.querySelector('.modal-edit-card__card-input')

if (cardNumberInput) {
  Inputmask({
    "mask": "9999 9999 9999 9999 9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(cardNumberInput)
}


// Срок действия в модалке редактирования карты

const cardDateInput = document.querySelector('.modal-edit-card__date-input')

if (cardDateInput) {
  Inputmask({
    "mask": "99 / 9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(cardDateInput)
}

// Дата внесения платежа в модалке новый приход

const incomingDateInput = document.querySelector('.modal-incoming__date-input')

if (incomingDateInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(incomingDateInput)
}
// Дата получения или отправки в модалке создать письмо

const letterDateInput = document.querySelector('.modal-create-letter__date-input')

if (letterDateInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(letterDateInput)
}

// Рассчетный счет

const initAccountCheckMask = () => {
  const accountCheckInputs = document.querySelectorAll('.account-input-mask')
  if (accountCheckInputs) {
    accountCheckInputs.forEach(el => {
      Inputmask({
        "mask": "9999 9999 9999 9999 9999",
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(el)
    })
  }
}
initAccountCheckMask()

// БИК счет

const initBikMask = () => {
  const bikInputs = document.querySelectorAll('.bik-input-mask')
  if (bikInputs) {
    bikInputs.forEach(el => {
      Inputmask({
        "mask": "999 999 999",
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(el)
    })
  }
}

initBikMask()

// Корр счет

const initCorrMask = () => {
  const corrInputs = document.querySelectorAll('.corr-input-mask')
  if (corrInputs) {
    corrInputs.forEach(el => {
      Inputmask({
        "mask": "9999 9999 9999 9999 9999",
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(el)
    })
  }
}

initCorrMask()


// Даты на странице создания документа

const docDateInputs = document.querySelectorAll('.create-doc-page .create-doc-page__date-input')
if (docDateInputs) {
  docDateInputs.forEach(el => {
    Inputmask({
      "mask": "99.99.9999",
      showMaskOnHover: false,
      showMaskOnFocus: false,
    }).mask(el)
  })
}


const dateInputMasks = document.querySelectorAll('.date-input-mask')

if (dateInputMasks) {
  dateInputMasks.forEach(el => {
    Inputmask({
      "mask": "99.99.9999",
      showMaskOnHover: false,
      showMaskOnFocus: false,
    }).mask(el)
  })

}

export { initDatePaymentsMask, initDateDealMask, initAccountCheckMask, initBikMask, initCorrMask }







