import Choices        from 'choices.js'
import { changePage } from '../_functions'

const pageSelectors = document.querySelectorAll('[data-select-page]')

const setSelectValue = (select) => {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('select-value')) {
      select.setChoiceByValue(localStorage.getItem('select-value'))
      localStorage.setItem('select-value', '')
    }
  })
}


// Селектор организации в заголовке на странице доход организации
const titleSelect = document.querySelector('.title__select')

if (titleSelect) {
  const titleSelectChoices = new Choices(titleSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  })
  setSelectValue(titleSelectChoices)
}


// Селектор организации в заголовке на странице движение денежных средств
const titleTrafficSelect = document.querySelector('.title__traffic-select');

if (titleTrafficSelect) {
  const titleTrafficChoices = new Choices(titleTrafficSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
  setSelectValue(titleTrafficChoices)
}

changePage(pageSelectors)


