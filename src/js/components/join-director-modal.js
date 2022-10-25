// Валидация 
const editFullnameForm = document.querySelector('.modal-join-director__wrap')
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

  editFullnameForm.addEventListener('focusin', (e) => {
    const inputTarget = e.target;
    inputTarget.classList.add('modal-fullname__input_active')
  })

  editFullnameForm.addEventListener('focusout', (e) => {
    const inputTarget = e.target;

    if (!inputTarget.value) {
      inputTarget.classList.remove('modal-fullname__input_active')
    }
  })
}
