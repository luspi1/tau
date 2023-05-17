import {
  checkValue,
  handlePopupInputs,
  showInfoModal
}                       from "../_functions"
import { initAllDates } from "./customDate"
import { initSelects }  from './customSelect'
import { initAllMasks } from "./inputMask"

let annexOptionalIndex = 1


const addTermsBtn = document.querySelector('.create-case-page__add-btn')
const termsList = document.querySelector('.case-terms__items')
const templateTermsFragment = document.querySelector('#case-terms-template')?.content
if (templateTermsFragment) {
  const templateTerms = templateTermsFragment.querySelector('.case-terms__item')
  if (addTermsBtn) {
    addTermsBtn.addEventListener('click', (e) => {

      const changeableList = document.querySelector('.case-terms__items')
      const changeableInputs = changeableList.querySelectorAll('input, textarea')
      if (!checkValue(changeableInputs)) {
        showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
        return
      }

      e.preventDefault()
      const termsEl = templateTerms.cloneNode(true)
      termsList.appendChild(termsEl)
      initSelects()
      initAllMasks()
      initAllDates()
    })
  }
}

const addOptionalBtn = document.querySelector('.case-optional__add-btn')
const optionalList = document.querySelector('.case-optional__items')
const templateOptionalFragment = document.querySelector('#case-optional-template')?.content
if (templateOptionalFragment) {
  const templateOptional = templateOptionalFragment.querySelector('.case-optional__item')
  if (addOptionalBtn) {
    addOptionalBtn.addEventListener('click', (e) => {
      const changeableList = document.querySelector('.case-optional__items')
      const changeableInputs = changeableList.querySelectorAll('input')
      if (!checkValue(changeableInputs)) {
        showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
        return
      }
      e.preventDefault()
      const optionalEl = templateOptional.cloneNode(true)
      optionalList.appendChild(optionalEl)
      initSelects()
    })
  }
}

const annexWrapper = document.querySelector('.case-annex__items')

if (annexWrapper) {

  const templateAnnexOptionalFragment = document.querySelector('#optional-annex-template')?.content
  const templateAnnexOptional = templateAnnexOptionalFragment.querySelector('.case-optional__item')

  annexWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('case-annex__add-optional-btn')) {

      const changeableList = document.querySelector('.case-annex .case-annex__optional-items')
      const changeableInputs = changeableList.querySelectorAll('input')
      if (!checkValue(changeableInputs)) {
        showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
        return
      }
      const currentOptional = e.target.closest('.case-annex__item')
      const optionalAnnexList = currentOptional.querySelector('.case-annex__optional-items')
      const optionalEl = templateAnnexOptional.cloneNode(true)
      optionalAnnexList.appendChild(optionalEl)
      initSelects()

      const annexIndex = optionalEl.closest('.case-annex__item').querySelector('.case-annex__add-optional-btn').dataset.index
      const selectInput = optionalEl.querySelector('select')
      const fieldNameInput = optionalEl.querySelector('.create-case-page__input-name')
      selectInput.name = `case_annex_field_type[${annexIndex}][]`
      fieldNameInput.name = `case_annex_field_type[${annexIndex}][]`
    }
  })
}


const addAnnexBtn = document.querySelector('.create-case-page__add-annex')
const annexList = document.querySelector('.case-annex__items')
const annexFragment = document.querySelector('#case-annex-template')?.content
if (annexFragment) {
  const annexEl = annexFragment.querySelector('.case-annex__item')
  if (addAnnexBtn) {
    addAnnexBtn.addEventListener('click', (e) => {
      e.preventDefault()

      const changeableList = document.querySelector('.case-annex__items')
      const changeableInputs = changeableList.querySelectorAll('input')
      if (!checkValue(changeableInputs)) {
        showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
        return
      }
      const optionalEl = annexEl.cloneNode(true)

      annexOptionalIndex++
      const selectInput = optionalEl.querySelector('select')
      const fieldNameInput = optionalEl.querySelector('.create-case-page__input-name')
      const addFieldBtn = optionalEl.querySelector('.case-annex__add-optional-btn')
      selectInput.name = `case_annex_field_type[${annexOptionalIndex}][]`
      fieldNameInput.name = `case_annex_field_name[${annexOptionalIndex}][]`
      addFieldBtn.dataset.index = annexOptionalIndex.toString()

      annexList.appendChild(optionalEl)
      initSelects()
    })
  }
}


// Удаление поля в приложении и всего приложения
if (annexWrapper) {
  annexWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('case-optional__delete-btn')) {
      const optionalTarget = e.target.closest('.case-optional__item')
      const optionalListTarget = e.target.closest('.case-annex__optional-items')
      optionalListTarget.removeChild(optionalTarget)
    }

    if (e.target.classList.contains('case-annex__delete-btn')) {
      const annexTarget = e.target.closest('.case-annex__item')
      const annexListTarget = e.target.closest('.case-annex__items')
      annexListTarget.removeChild(annexTarget)
    }
  })
}


// Удаление поля в опциональных полях

const optionalWrapper = document.querySelector('.case-optional__items')

if (optionalWrapper) {
  optionalWrapper.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('case-optional__delete-btn')) {
      const optionalTarget = e.target.closest('.case-optional__item')
      const optionalListTarget = e.target.closest('.case-optional__items')
      optionalListTarget.removeChild(optionalTarget)
    }

  })
}


// Удаление платежного условия сделки

const termsWrapper = document.querySelector('.case-terms__items')

if (termsWrapper) {
  termsWrapper.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('case-optional__delete-btn')) {
      const optionalTarget = e.target.closest('.case-terms__item')
      const optionalListTarget = e.target.closest('.case-terms__items')
      optionalListTarget.removeChild(optionalTarget)
    }
  })
}


// Появления списка элементов полученных от сервера


const createCaseInputs = document.querySelectorAll('.create-case-page__popup-input')

if (createCaseInputs) {
  createCaseInputs.forEach(el => {
    el.addEventListener('input', handlePopupInputs)
  })
}


// валидация формы

const createCasePage = document.querySelector('.create-case-page')

if (createCasePage) {

  // передача id_unit из поля организации скрипту поиска шаблона

  const orgCaseSelect = createCasePage.querySelector('.create-case-page__organization select')
  const docTemplatePopupInputs = createCasePage.querySelectorAll('.case-templates .select-popup')

  orgCaseSelect.addEventListener('change', e => {
    let orgIdUnit = e.detail.value
    docTemplatePopupInputs.forEach(el => {
      const prevTemplateData = JSON.parse(el.dataset.json)
      const newTemplateData = {...prevTemplateData, id_unit: orgIdUnit}
      el.dataset.json = JSON.stringify(newTemplateData)
    })
  })
}
















