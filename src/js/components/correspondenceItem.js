import { checkConfirm } from '../_functions'

const corrItemPage = document.querySelector('.correspondence-item')

if (corrItemPage) {
  const delBtn = corrItemPage.querySelector('.newmail-one__delete-btn')
  delBtn.addEventListener('click', (e) => {
    e.preventDefault()
    checkConfirm(() => console.log('письмо удалено'))
  })
}
