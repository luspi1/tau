// Появления списка элементов полученных от сервера

import { closeSelectPopups, handlePopupInputs } from "../_functions";

const copyCaseInput = document.querySelector('.modal-copy-case__input')

if (copyCaseInput) {
  copyCaseInput.addEventListener('input', handlePopupInputs)
}


// закрытие попап-селектов

const createCasePage = document.querySelector('.create-case-page')

closeSelectPopups(createCasePage)

// очистка инпута

const delValueBtn = document.querySelector('.modal-copy-case__delete-btn')


if (delValueBtn) {
  delValueBtn.addEventListener('click', (e) => {
    e.preventDefault()
    copyCaseInput.value = ''
  })
}
