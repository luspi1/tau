import Inputmask from "inputmask";

const phoneInput = document.querySelector('.prime-info__phone-input input');

if (phoneInput) {
  Inputmask({
    "mask": "+7 999 999-99-99",
    showMaskOnHover: false
  }).mask(phoneInput);
}


