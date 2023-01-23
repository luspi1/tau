import { initAllDates }     from './customDate'
import { initDateDealMask } from './inputMask'

const changeableLists = document.querySelectorAll('ul[data-list="changeable"]')

// Инициализация необходимых кастомных инпутов

const initInputs = () => {
  initAllDates()
  initDateDealMask()
}


if (changeableLists) {
  // Удаление элементов в изменяемых списках
  changeableLists.forEach(list => {
    list.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.target.dataset.btn === "delete") {
        e.target.closest('li').remove()
      }
    })
  })
}

// Добавление элементов в изменяемых списках


const addToListBtns = document.querySelectorAll('button[data-btn="add"]')

if (addToListBtns) {
  addToListBtns.forEach(addBtn => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const templateId = e.currentTarget.dataset.template
      let templateFragment = document.querySelector(`#${templateId}`)?.content
      let templateElement = templateFragment.firstElementChild.cloneNode(true)
      const targetChangeableList = e.currentTarget.parentElement.querySelector('ul[data-list="changeable"]')
      targetChangeableList.appendChild(templateElement)
      initInputs()
    })
  })
}

