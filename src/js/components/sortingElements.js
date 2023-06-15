import { sortArr } from '../_functions'

//Сортировка на клиенте

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


//Сортировка на сервере


const serverSelects = document.querySelectorAll('.server-sort')

if (serverSelects) {
  serverSelects.forEach(select => {
    select.addEventListener('input', (e) => {
      let linkUrl = e.target.selectedOptions[0].dataset.url
      if (linkUrl) {
        window.location.href = linkUrl
      }
    })
  })
}
