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
    "mask": "9999_999999",
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
const datePrimeInput = document.querySelector('.prime-info__date-input .edit-input');

if (datePrimeInput) {
  Inputmask({
    "mask": "99.99.9999",
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask(datePrimeInput);
}


