import Choices                                    from 'choices.js'
import { sendData, serializeForm, showInfoModal } from '../_functions'

import { nothingFoundBlock } from '../_vars'
import { initCopyValues }    from './copyValue'


const tagsPage = document.querySelector('.templater-page')

if (tagsPage) {

  const filterSelect = tagsPage.querySelector('.templater__select-wrap select')

  const choicesFilter = new Choices(filterSelect, {
    itemSelectText: '',
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true
  })

  initCopyValues()

  const templaterList = tagsPage.querySelector('.templater__list')
  const templaterSubmitScript = tagsPage.querySelector('.templater').dataset.templatersScript


  // функция рендера массива с тегами
  const renderTags = (currentArr) => {
    let tagsCount = tagsPage.querySelector('.templater__tags-count')

    if (currentArr?.length > 0) {
      tagsCount.textContent = currentArr.length
      templaterList.innerHTML = currentArr.map(el => `
    <li class="templater__item">
            <p class="col-1">${el.chapter}</p>
            <p class="col-2">${el.title}</p>
            <div class="col-3">
              <div title="Example descriptions" class="templater__svg-wrap">
                <svg width="23" height="24" viewBox="0 0 23 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.5 23.2371C17.8513 23.2371 23 18.0883 23 11.7371C23 5.38579 17.8513 0.237061 11.5 0.237061C5.14873 0.237061 0 5.38579 0 11.7371C0 18.0883 5.14873 23.2371 11.5 23.2371Z"
                    fill="#D2D2D8"/>
                  <path
                    d="M10.5741 14.2859V14.2085C10.5827 13.3874 10.6687 12.734 10.8321 12.2483C10.9954 11.7625 11.2275 11.3692 11.5284 11.0683C11.8294 10.7674 12.1905 10.4901 12.6117 10.2365C12.8654 10.0817 13.0932 9.89901 13.2952 9.68838C13.4973 9.47344 13.6563 9.22626 13.7724 8.94684C13.8928 8.66742 13.9529 8.35791 13.9529 8.01831C13.9529 7.59704 13.8541 7.23164 13.6563 6.92213C13.4586 6.61262 13.1942 6.37404 12.8632 6.20639C12.5322 6.03874 12.1647 5.95492 11.7606 5.95492C11.4081 5.95492 11.0685 6.02799 10.7418 6.17415C10.4151 6.32031 10.1421 6.55029 9.92287 6.8641C9.70363 7.17791 9.57682 7.58844 9.54243 8.09569H7.9175C7.95189 7.3649 8.14104 6.73944 8.48494 6.21929C8.83313 5.69914 9.29095 5.30151 9.85839 5.02639C10.4301 4.75127 11.0642 4.61371 11.7606 4.61371C12.5172 4.61371 13.1749 4.76416 13.7337 5.06507C14.2968 5.36599 14.731 5.77867 15.0362 6.30311C15.3457 6.82756 15.5005 7.42509 15.5005 8.09569C15.5005 8.56855 15.4274 8.99628 15.2813 9.37887C15.1394 9.76145 14.9331 10.1032 14.6622 10.4041C14.3957 10.705 14.0733 10.9716 13.695 11.2037C13.3167 11.4401 13.0137 11.6894 12.7858 11.9517C12.558 12.2096 12.3925 12.517 12.2893 12.8737C12.1862 13.2305 12.1303 13.6755 12.1217 14.2085V14.2859H10.5741ZM11.3995 18.1032C11.0814 18.1032 10.8084 17.9893 10.5806 17.7614C10.3527 17.5336 10.2388 17.2606 10.2388 16.9425C10.2388 16.6244 10.3527 16.3514 10.5806 16.1236C10.8084 15.8958 11.0814 15.7818 11.3995 15.7818C11.7176 15.7818 11.9906 15.8958 12.2184 16.1236C12.4462 16.3514 12.5601 16.6244 12.5601 16.9425C12.5601 17.1531 12.5064 17.3466 12.3989 17.5228C12.2958 17.6991 12.1561 17.8409 11.9798 17.9484C11.8079 18.0516 11.6144 18.1032 11.3995 18.1032Z"
                    fill="white"/>
                </svg>
              </div>
              <span class="copy-values"
                    title="copy">${el.code}</span>
            </div>
            <p class="col-4">${el.type}</p>
          </li>
  `).join('')
    } else {
      templaterList.innerHTML = nothingFoundBlock
      tagsCount.textContent = "0"
    }
  }

  let tagsArr = []

  //Получение массива тегов
  const getTemplatersData = async () => {
    const data = ''
    try {
      const response = await sendData(data, templaterSubmitScript)
      const finishedResponse = await response.json()
      const {status, errortext, templaters} = finishedResponse
      if (status === 'ok') {
        return templaters
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  let filteredTags = []

  getTemplatersData()
    .then((tags) => {
      tagsArr = tags
      filteredTags = tags
      tagsArr = filteredTags.sort((a, b) => a.title.localeCompare(b.title))
      renderTags(tagsArr)
    })

  // функционал фильтрации
  const searchInput = tagsPage.querySelector('.templater__input-wrap input')
  const filterTagsList = (searchValue) => {
    filteredTags = tagsArr.filter(tag => {
      return (
        tag.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
    renderTags(filteredTags)
  }

  searchInput.addEventListener('input', (e) => {
    let selectInputValue = tagsPage.querySelector('.templater__select-wrap select').value
    filterTagsList(e.target.value, selectInputValue)
  })

  filterSelect.addEventListener('change', (e) => {
    let sortValue = e.detail.value
    let sortedArr = []
    switch (sortValue) {
      case 'abcDecr' :
        sortedArr = filteredTags.sort((a, b) => a.title.localeCompare(b.title))
        renderTags(sortedArr)
        break
      case 'abcIncr' :
        sortedArr = filteredTags.sort((a, b) => b.title.localeCompare(a.title))
        renderTags(sortedArr)
        break
      case 'required' :
        sortedArr = filteredTags.sort((a, b) => a.type.localeCompare(b.type))
        renderTags(sortedArr)
        break
      default :
        sortedArr = filteredTags.sort((a, b) => a.title.localeCompare(b.title))
        renderTags(sortedArr)
        break

    }
  })

  //сброс значений формы
  const resetTagsFilterBtn = tagsPage.querySelector('.templater__reset-btn')
  const tagsFilterForm = tagsPage.querySelector('.templater__select-flex')
  resetTagsFilterBtn.addEventListener('click', (e) => {
    e.preventDefault()
    tagsFilterForm.reset()
    renderTags(tagsArr)
    choicesFilter.setChoiceByValue('abcDecr')
  })

}


