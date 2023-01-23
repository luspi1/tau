import { initPaymentSelects }   from "./customSelect"
import { initDatePaymentsMask } from "./inputMask"
import { initAllDates }         from "./customDate"
import { handlePopupInputs }    from "../_functions"

let annexOptionalIndex = 1


const addTermsBtn = document.querySelector('.create-case-page__add-btn')
const termsList = document.querySelector('.case-terms__items')
const templateTermsFragment = document.querySelector('#case-terms-template')?.content
if (templateTermsFragment) {
  const templateTerms = templateTermsFragment.querySelector('.case-terms__item')
  if (addTermsBtn) {
    addTermsBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const termsEl = templateTerms.cloneNode(true)
      termsList.appendChild(termsEl)
      initPaymentSelects()
      initDatePaymentsMask()
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
      e.preventDefault()
      const optionalEl = templateOptional.cloneNode(true)
      optionalList.appendChild(optionalEl)
      initPaymentSelects()
    })
  }
}

const annexWrapper = document.querySelector('.case-annex__items')

if (annexWrapper) {

  const templateAnnexOptionalFragment = document.querySelector('#optional-annex-template')?.content
  const templateAnnexOptional = templateAnnexOptionalFragment.querySelector('.case-optional__item')

  annexWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('case-annex__add-optional-btn')) {
      const currentOptional = e.target.closest('.case-annex__item')
      const optionalAnnexList = currentOptional.querySelector('.case-annex__optional-items')
      const optionalEl = templateAnnexOptional.cloneNode(true)
      optionalAnnexList.appendChild(optionalEl)
      initPaymentSelects()

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
      const optionalEl = annexEl.cloneNode(true)

      annexOptionalIndex++
      const selectInput = optionalEl.querySelector('select')
      const fieldNameInput = optionalEl.querySelector('.create-case-page__input-name')
      const addFieldBtn = optionalEl.querySelector('.case-annex__add-optional-btn')
      selectInput.name = `case_annex_field_type[${annexOptionalIndex}][]`
      fieldNameInput.name = `case_annex_field_name[${annexOptionalIndex}][]`
      addFieldBtn.dataset.index = annexOptionalIndex.toString()

      annexList.appendChild(optionalEl)
      initPaymentSelects()
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
























