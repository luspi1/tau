import { checkValue }       from '../_functions'
import { initAllDates }     from './customDate'
import { initDateDealMask } from './inputMask'


const changeablePage = document.querySelector('ul[data-list="changeable"]')?.closest('main')


// Инициализация необходимых кастомных инпутов

const initInputs = () => {
  initAllDates()
  initDateDealMask()
}

// добавление/удаление элементов в изменяемых списках

if (changeablePage) {

  // Удаление элементов в изменяемых списках

  changeablePage.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.dataset.btn === "delete") {
      e.target.closest('li').remove()
    }

    // Добавление элементов в изменяемых списках

    if (e.target.dataset.btn === "add") {
      const targetChangeableList = e.target.parentElement.querySelector('ul[data-list="changeable"]')
      let changeableInputs = targetChangeableList.querySelectorAll('input')

      //проверка наличия значений в инпутах, для запрета создания новых элементов без значения
      if (!checkValue(changeableInputs)) {
        return
      }
      const templateId = e.target.dataset.template
      let templateFragment = document.querySelector(`#${templateId}`)?.content
      let templateElement = templateFragment.firstElementChild.cloneNode(true)
      targetChangeableList.appendChild(templateElement)
      initInputs()
    }
  })

}




