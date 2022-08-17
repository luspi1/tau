const passportForm = document.querySelector('.passport-modal__form')

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
