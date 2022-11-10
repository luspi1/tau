import { cutString } from "../_functions";

//обрезка длинных строк таблицы на мобильной версии

const trimStrings = document.querySelectorAll('.income-list-page' +
  ' .flex-table__cell-text[data-shear]')

const mediaQuery = window.matchMedia('(max-width: 768px)')

if (mediaQuery.matches) {
  cutString(trimStrings)
}
