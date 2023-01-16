import { closeSelectPopups, handlePopupInputs } from "../_functions";

// Появления списка элементов полученных от сервера в полях "Родительский договор", "Шаблон документа"

const docPopupInputs = document.querySelectorAll('.create-doc-page .select-popup-input')

if (docPopupInputs) {
  docPopupInputs.forEach(input => {
    input.addEventListener('input', handlePopupInputs)
  })
}

// закрытие попап-селектов

const createDealPage = document.querySelector('.create-doc-page')
closeSelectPopups(createDealPage)

// Смена состояние страницы, в зависимости от селекта "Тип документа"

const typeDocSelect = document.querySelector('.create-doc-page__type-doc-select')

if (typeDocSelect) {

  typeDocSelect.addEventListener('change', (e) => {
    createDealPage.dataset.pageState = e.target.value
  })

}
