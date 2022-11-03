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

