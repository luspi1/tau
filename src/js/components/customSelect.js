import Choices from 'choices.js'


// Селекторы в модалке социалок
const initSelects = () => {
  document.querySelectorAll('.socials-list__item').forEach(el => {
    const select = el.querySelector('.socials-list__selector-link')
    const choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: true
    })
  })


// Селектор в модалке нового контакта
  const typeContactInput = document.querySelector('.new-contact__type-input')

  if (typeContactInput) {
    const choices = new Choices(typeContactInput, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }


// Селекторы на странице редактирования контактов

  document.querySelectorAll('.edit-contact__item select:not(.edit-contact__contact-type-btn)')
    .forEach(el => {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })


// Селекторы на странице новой организации

  document.querySelectorAll('.new-organization__item select').forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  })

// Селектор фильтрации на странице кейсов
  const casesInput = document.querySelector('.cases__filter-input')

  if (casesInput) {
    const choices = new Choices(casesInput, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }


// Селекторы на странице создания кейса

  document.querySelectorAll('.create-case-page__input-wrapper select').forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  })


// Селекторы на странице создания сделки
  const dealExecutorSelect = document.querySelector('.create-deal-page__executor-select')

  if (dealExecutorSelect) {
    const choices = new Choices(dealExecutorSelect, {
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }

  document.querySelectorAll('.create-deal-page__payments-select').forEach(el => {
    const choices = new Choices(el, {
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  })


  document.querySelectorAll('.create-deal-page__custom-select').forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  })


// Селект на странице договор и документы

  const dealsDocSelect = document.querySelector('.deals-documents__select-input')

  if (dealsDocSelect) {
    const choices = new Choices(dealsDocSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }


// Селектор в поиске на странице история сделки
  const searchSelect = document.querySelector('.search__select')

  if (searchSelect) {
    const choices = new Choices(searchSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }

// Селектор в поиске на странице все сделки
  const dealsSelect = document.querySelector('.deals__select')

  if (dealsSelect) {
    const choices = new Choices(dealsSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    })
  }

// Селектор в поиске на странице доходы
  const incomingPageSelects = document.querySelectorAll('.filter__select-wrap select')
  if (incomingPageSelects) {
    incomingPageSelects.forEach(el => {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })
  }


  const incomeListSelects = document.querySelectorAll('.income-list-page__select')

  if (incomeListSelects) {
    incomeListSelects.forEach(el => {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })
  }


// Селекторы в модалке нового платежа в Баланс сделки


  const addPaymentModalSelects = document.querySelectorAll('.add-payment__select-wrapper select')

  if (addPaymentModalSelects) {
    addPaymentModalSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }


// Селекторы в модалке нового прихода
  const incomingModalSelects = document.querySelectorAll('.modal-incoming__select-wrapper:not(.modal-incoming__select-wrapper-payment) select')

  if (incomingModalSelects) {
    incomingModalSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }

// Селекторы в модалке "создать письмо"
  const letterModalSelects = document.querySelectorAll('.modal-create-letter__select-wrapper select')

  if (letterModalSelects) {
    letterModalSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }


// Селекторы фильтров на странице "корреспонденция(все письма)"
  const newMailsSelects = document.querySelectorAll('.newmails__search select')

  if (newMailsSelects) {
    newMailsSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }


  const trafficSelects = document.querySelectorAll('.traffic__select-wrap select')

  if (trafficSelects) {
    trafficSelects.forEach(el => {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })
  }

// Селекторы фильтров шаблонов и документов на странице "все документы и шаблоны"
  const templateDocumentsSelects = document.querySelectorAll('.all-documents__select-wrap select')

  if (templateDocumentsSelects) {
    templateDocumentsSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }

// Селектор фильтра типа документа на странице "только документы"
  const onlyDocumentSelects = document.querySelectorAll('.only-documents__select-wrap select')

  if (onlyDocumentSelects) {
    onlyDocumentSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }

// Селектор фильтра типа шаблона на странице "только шаблоны"
  const onlyTemplatesSelects = document.querySelectorAll('.only-templates__select-wrap select')

  if (onlyTemplatesSelects) {
    onlyTemplatesSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }

// Селектор типа документа на странице создания документа
  const createDocSelects = document.querySelectorAll('.create-doc-page__custom-select')

  if (createDocSelects) {
    createDocSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }


// Селекторы на странице "создания шаблона"
  const typeTemplateSelects = document.querySelectorAll('.create-template__type-doc')

  if (typeTemplateSelects) {
    typeTemplateSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }

  // Селекторы модалки  на странице "Баланс сделки"
  const changeEmployeeSelects = document.querySelectorAll('.change-employee__select')

  if (changeEmployeeSelects) {
    changeEmployeeSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true
      })
    })
  }


  // Общая инциализация селекторов

  const generalSelects = document.querySelectorAll('.custom-select')
  if (generalSelects) {
    generalSelects.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true,
      })
    })
  }
}
// Общая инциализация селектов с множественным выбором

const generalMultSelects = document.querySelectorAll('.custom-mult-select__input')
if (generalMultSelects) {
  generalMultSelects.forEach(el => {
    const choices = new Choices(el, {
      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
      allowHTML: true,
      removeItemButton: true,
      noChoicesText: 'Пусто',
    })
  })
}


document.addEventListener('click', ({target}) => {
  if (target && target.classList.contains('signing-doc__list-add')) {
    const signingDocSelects = document.querySelectorAll('.signing-doc-select')

    if (signingDocSelects) {
      signingDocSelects.forEach(el => {
        const choices = new Choices(el, {
          itemSelectText: '',
          searchEnabled: false,
          shouldSort: false,
          allowHTML: true
        })
      })
    }
  }
})

initSelects()


export { initSelects }

