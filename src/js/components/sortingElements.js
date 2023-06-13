import { sortArr } from '../_functions'

const sortWrappers = document.querySelectorAll('.sort-wrapper')

if (sortWrappers) {
  sortWrappers.forEach(sortWrapper => {
    const sortSelect = sortWrapper.querySelector('.sort-select')
    const sortList = sortWrapper.querySelector('.sort-list')
    const sortElementsArr = Array.from(sortList.querySelectorAll('[data-sort-name]:not([data-sort-name="title"])'))

    if (sortSelect) {
      sortArr('dateNew', sortElementsArr, sortList)
      sortSelect.addEventListener('change', (e) => {
        let selectValue = e.detail.value
        sortArr(selectValue, sortElementsArr, sortList)
      })
    }
  })
}
