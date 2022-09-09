import Choices from "choices.js";

const typeContactInput = document.querySelector('.new-contact__type-input')

// Селекторы в модалке социалок
const initSelects = () => {
  document.querySelectorAll('.socials-list__item').forEach(el => {
    const select = el.querySelector('.socials-list__selector-link')
    const choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
    });
  })
}

initSelects()

// Селекторы в таблице контактов

document.querySelectorAll('.contacts-table__selector').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
  });
})

// Селектор в модалке нового контакта

if (typeContactInput) {
  const choices = new Choices(typeContactInput, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
}


// Селекторы на странице редактирования контактов

document.querySelectorAll('.edit-contact__item select').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
})

// Селекторы на странице новой организации

document.querySelectorAll('.new-organization__item select').forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
})



export {initSelects}
