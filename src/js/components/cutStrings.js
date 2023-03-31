import { cutString } from "../_functions";

//обрезка длинных строк таблицы на мобильной версии на странице список доходов

const trimIncomeStrings = document.querySelectorAll('.income-list-page' +
  ' .flex-table__cell-text[data-shear]')

const mediaQuery = window.matchMedia('(max-width: 768px)')

if (mediaQuery.matches) {
  cutString(trimIncomeStrings)
}

//обрезка длинных строк  на странице одного документа

const trimOneDocStrings = document.querySelectorAll('.one-document-page a[data-shear]');
cutString(trimOneDocStrings);

//обрезка длинных строк  на странице элемент шаблона

const trimTemplateItemStrings = document.querySelectorAll('.template-item-page a[data-shear]');
cutString(trimTemplateItemStrings);

//обрезка длинных строк в aside на страницах - deal-card, deal-documents, deal-story,  deal-balance

const trimAsideStrings = document.querySelectorAll('.aside__top a[data-shear]');
cutString(trimAsideStrings);

//обрезка длинных строк в aside на странице - correspondence

const trimCorrStrings = document.querySelectorAll('.correspondence a[data-shear]');
cutString(trimCorrStrings);

