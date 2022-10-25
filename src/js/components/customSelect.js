import Choices from "choices.js";

const typeContactInput = document.querySelector('.new-contact__type-input')
const casesInput = document.querySelector('.cases__filter-input')

// Селекторы в модалке социалок
const initSelects = () => {
  document.querySelectorAll('.socials-list__item').forEach(el => {
    const select = el.querySelector('.socials-list__selector-link')
    const choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: true
    });
  })
}

initSelects()

// Селекторы в таблице контактов

document.querySelectorAll('.contacts-table__selector').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true
  });
})

// Селектор в модалке нового контакта

if (typeContactInput) {
  const choices = new Choices(typeContactInput, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}


// Селекторы на странице редактирования контактов

document.querySelectorAll('.edit-contact__item select').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
})

// Селекторы на странице новой организации

document.querySelectorAll('.new-organization__item select').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
})

// Селектор фильтрации на странице кейсов

if (casesInput) {
  const choices = new Choices(casesInput, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}


// Селекторы на странице создания кейса

const initPaymentSelects = () => {
  document.querySelectorAll('.create-case-page__input-wrapper select').forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    });
  })
}

initPaymentSelects()


// Селекторы на странице создания сделки
const dealExecutorSelect = document.querySelector('.create-deal-page__executor-select')

if (dealExecutorSelect) {
  const choices = new Choices(dealExecutorSelect, {
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}


const initPaymentsSelect = () => {
  document.querySelectorAll('.create-deal-page__payments-select').forEach(el => {
    const choices = new Choices(el, {
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true
    });
  })
}

initPaymentsSelect()

document.querySelectorAll('.create-deal-page__custom-select').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
})


// Селект на странице договор и документы

const dealsDocSelect = document.querySelector('.deals-documents__select-input')

if (dealsDocSelect) {
  const choices = new Choices(dealsDocSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}


// Селектор в поиске на странице история сделки
const searchSelect = document.querySelector('.search__select');

if (searchSelect) {
  const choices = new Choices(searchSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}

// Селектор в поиске на странице все сделки
const dealsSelect = document.querySelector('.deals__select');

if (dealsSelect) {
  const choices = new Choices(dealsSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}

// Селектор организации в заголовке на странице доход организации
const titleSelect = document.querySelector('.title__select');


if (titleSelect) {
  const choices = new Choices(titleSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    allowHTML: true
  });
}



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

// Селекторы в модалке нового прихода
const incomingModalSelects = document.querySelectorAll('.modal-incoming__select-wrapper select')

if (incomingModalSelects) {
  incomingModalSelects.forEach(el => {
    const choices = new Choices(el, {
      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
      allowHTML: true
    });
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
    });
  })
}


export { initSelects, initPaymentSelects, initPaymentsSelect }

