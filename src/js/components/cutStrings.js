import { cutString } from "../_functions"

//обрезка длинных строк таблицы на мобильной версии на странице список доходов

const trimIncomeStrings = document.querySelectorAll('.income-list-page' +
  ' .flex-table__cell-text[data-shear]')

const mediaQuery = window.matchMedia('(max-width: 768px)')

if (mediaQuery.matches) {
  cutString(trimIncomeStrings)
}

//обрезка длинных строк  на странице одного документа

const trimOneDocStrings = document.querySelectorAll('.one-document-page a[data-shear]')
cutString(trimOneDocStrings)

//обрезка длинных строк  на странице одного счета

const trimOneScoreStrings = document.querySelectorAll('.one-score-page a[data-shear]')
cutString(trimOneScoreStrings)

//обрезка длинных строк  на странице одного акта

const trimOneActStrings = document.querySelectorAll('.one-act-page a[data-shear]')
cutString(trimOneActStrings)

//обрезка длинных строк  на странице элемент шаблона

const trimTemplateItemStrings = document.querySelectorAll('.template-item-page a[data-shear]')
cutString(trimTemplateItemStrings)

//обрезка длинных строк в aside на страницах - deal-card, deal-documents, deal-story,  deal-balance

const trimAsideStrings = document.querySelectorAll('.aside__top a[data-shear]')
cutString(trimAsideStrings)

//обрезка длинных строк на странице - correspondence

const trimCorrStrings = document.querySelectorAll('.correspondence a[data-shear]')
cutString(trimCorrStrings)

//обрезка длинных строк на странице - contact-correspondence

const trimContactCorrStrings = document.querySelectorAll('.contact-correspondence a[data-shear]')
cutString(trimContactCorrStrings)

//обрезка длинных строк в aside на странице - correspondence-item
const trimCorrItemStrings = document.querySelectorAll('.newmail-one [data-shear]')
cutString(trimCorrItemStrings)

//обрезка длинных строк на странице - correspondence-outside

const trimCorrOutStrings = document.querySelectorAll('.correspondence-outside a[data-shear]')
cutString(trimCorrOutStrings)

//обрезка длинных строк на странице - deal-balance
const trimBallanceItemStrings = document.querySelectorAll('.deals-balance-table__description[data-shear]')
cutString(trimBallanceItemStrings)

//обрезка длинных строк на странице - deal-balance
const trimIncomePageStrings = document.querySelectorAll('.income-page [data-shear]')
cutString(trimIncomePageStrings)
