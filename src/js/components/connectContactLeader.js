const delValueBtn = document.querySelector('.modal-connect-leader__delete-btn')
const searchContactInput = document.querySelector('.modal-connect-leader__input')


if (delValueBtn) {
  delValueBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchContactInput.value = ''
  })
}
