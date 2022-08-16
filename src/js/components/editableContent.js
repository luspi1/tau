import { updateGeneralFields, writeGeneralData } from "../_functions";

const editElements = document.querySelectorAll('.edit-el')

const generalInfo = {
  email: '',
  phone: '',
  city: '',
  about: '',
}


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

  agreeBtn.addEventListener('click', () => {
    editValue.textContent = input.value
    writeGeneralData(input, generalInfo)
    updateGeneralFields(input, generalInfo)
    editValue.style.visibility = 'visible'
    editBtn.style.visibility = 'visible'
    inputWrapper.classList.remove('_active')
    console.log(generalInfo)
  })

  closeBtn.addEventListener('click', () => {
    inputWrapper.classList.remove('_active')
    editValue.style.visibility = 'visible'
    editBtn.style.visibility = 'visible'
  })

})
