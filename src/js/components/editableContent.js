import {
  sendData,
  showInfoModal,
  toggleLoader
} from "../_functions";

const editElements = document.querySelectorAll('.edit-el')
const confirmEmailText = 'На Вашу почту было отправлено письмо с подтверждением.'
// Обработка событий, по нажатию на кнопки: редактировать, подтвердить, закрыть у одноинпутного
// редактирования

editElements.forEach(el => {
  const agreeBtn = el.querySelector('.agree-btn')
  const closeBtn = el.querySelector('.close-btn')
  const editBtn = el.querySelector('.edit-btn')
  const inputWrapper = el.querySelector('.edit-wrapper')
  const editValue = el.querySelector('.edit-value')
  const input = el.querySelector('.edit-input')

  editBtn.addEventListener('click', () => {
    inputWrapper.classList.add('_active')
    input.value = editValue.textContent
    editValue.style.visibility = 'hidden'
    editBtn.style.visibility = 'hidden'
    input.focus()
  })

  agreeBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const inputName = input.name
    const inputValue = input.value

    if (inputName === 'email') {
      const emailData = {
        email: input.value
      }

      const jsonData = JSON.stringify(emailData)

      toggleLoader()
      const response = await sendData(jsonData, '/include/ajax/save_email.php')
      const finishedResponse = await response.json()
      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        inputWrapper.classList.remove('_active')
        editValue.textContent = input.value
        editValue.style.visibility = 'visible'
        editBtn.style.visibility = 'visible'
        inputWrapper.classList.remove('_active')
        showInfoModal(confirmEmailText)
      } else {
        showInfoModal(errortext)
      }

    } else {
      const inputData = {
        fieldname: inputName,
        fieldvalue: inputValue,
      }
      const jsonData = JSON.stringify(inputData)

      toggleLoader()

      const response = await sendData(jsonData, '/include/ajax/save_userfield.php')
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        inputWrapper.classList.remove('_active')
        editValue.textContent = input.value
        editValue.style.visibility = 'visible'
        editBtn.style.visibility = 'visible'
        inputWrapper.classList.remove('_active')
      } else {
        showInfoModal(errortext)
      }
    }

  })

  closeBtn.addEventListener('click', () => {
    inputWrapper.classList.remove('_active')
    editValue.style.visibility = 'visible'
    editBtn.style.visibility = 'visible'
  })
})
