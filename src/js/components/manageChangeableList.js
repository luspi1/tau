import { checkValue, showInfoModal } from '../_functions'
import { initAllDates }              from './customDate'
import { initSelects }               from './customSelect'
import { initAllMasks }              from './inputMask'


// Инициализация необходимых кастомных инпутов

const initInputs = () => {
  initAllDates()
  initAllMasks()
  initSelects()
}

const updateSerialNumbers = (elArr) => {
  if (elArr) {
    elArr.forEach((changeEl, i) => {
      const serialNumber = changeEl.querySelector('.changeable-serial-number')
      if (serialNumber) {
        serialNumber.textContent = i + 1
      }
    })
  }
}


// добавление/удаление элементов в изменяемых списках

export const initChangeableLists = () => {
  const changeablePage = document.querySelector('ul[data-list="changeable"]')?.closest('main')

  if (changeablePage) {

    // Удаление элементов в изменяемых списках

    changeablePage.addEventListener('click', (e) => {
      if (e.target.dataset.btn === "delete") {
        e.target.closest('li').remove()

        //обновление UI порядковых номеров элементов
        const changeableLists = changeablePage.querySelectorAll('ul[data-list="changeable"]')

        changeableLists.forEach(list => {
          const listEls = list.querySelectorAll('li')
          updateSerialNumbers(listEls)
        })

      }

      // Добавление элементов в изменяемых списках

      if (e.target.dataset.btn === "add") {
        const targetChangeableList = e.target.parentElement.querySelector('ul[data-list="changeable"]')
        let changeableInputs = targetChangeableList.querySelectorAll('input')

        //проверка наличия значений в инпутах, для запрета создания новых элементов без значения
        if (!checkValue(changeableInputs)) {
          showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
          return
        }
        const templateId = e.target.dataset.template
        let templateFragment = document.querySelector(`#${templateId}`)?.content
        let templateElement = templateFragment.firstElementChild.cloneNode(true)
        targetChangeableList.appendChild(templateElement)
        const changeableElements = targetChangeableList.querySelectorAll('li')
        initInputs()
        updateSerialNumbers(changeableElements)
      }
    })

  }
}

initChangeableLists()




