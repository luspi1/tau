import Inputmask from "inputmask";

const phoneInput = document.querySelector('.prime-info__phone-input input');

if (phoneInput) {
  Inputmask({
    "mask": "+7 999 999-99-99",
    showMaskOnHover: false
  }).mask(phoneInput);
}

const passportInput = document.querySelector('.passport-modal__series-input');

if (passportInput) {
  Inputmask({
    "mask": "9999 999999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(passportInput);
}

const datePassportInput = document.querySelector('.passport-modal__date-input');

if (datePassportInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(datePassportInput);
}

const codePassportInput = document.querySelector('.passport-modal__code-input');

if (codePassportInput) {
  Inputmask({
    "mask": "999-999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(codePassportInput);
}


const datePrimeInput = document.querySelector('.prime-info__date-input .edit-input');

if (datePrimeInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(datePrimeInput);
}

const contactPhone = document.querySelector('.new-contact__phone-input');

if (contactPhone) {
  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(contactPhone);
}

const editContactPhoneInputs = document.querySelectorAll('.edit-contact__phones .edit-contact__input');

editContactPhoneInputs.forEach(el => {
  if (el) {
    Inputmask({
      "mask": "+7 (999) 999-99-99",
      showMaskOnHover: false
    }).mask(el);
  }
})


const newOrganizationPhoneInputs = document.querySelectorAll('.new-organization__phones .new-organization__input');


newOrganizationPhoneInputs.forEach(el => {
  if (el) {
    Inputmask({
      "mask": "+7 (999) 999-99-99",
      showMaskOnHover: false
    }).mask(el);
  }
})


// Пасспортные данные на странице редактирования контакта

const physPassportInput = document.querySelector('input[name="physNumberPassport"]');

if (physPassportInput) {
  Inputmask({
    "mask": "9999 999999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(physPassportInput);
}
const physDatePassportInput = document.querySelector('input[name="physDatePassport"]');

if (physDatePassportInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(physDatePassportInput);
}

// Снилс на странице документов


const snilsInput = document.querySelector('.page-doc__snils-input input');

if (snilsInput) {
  Inputmask({
    "mask": "999-999-999 99",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(snilsInput);
}


// Дата платежа на странице создания кейса


const initDatePaymentsMask = () => {
  const datePayments = document.querySelectorAll('.create-case-page__date-input');

  datePayments.forEach(el => {
    Inputmask({
      "mask": "99.99.9999",
      showMaskOnHover: false,
      showMaskOnFocus: false,
    }).mask(el);
  })

}

initDatePaymentsMask()


export { initDatePaymentsMask }







