import { v4 as uuidv4 } from 'uuid';

const addAccountBtn = document.querySelector('.new-organization__add-account button')
const accountsContainer = document.querySelector('.new-organization__account-list')


// Добавление еще одного счета

if (addAccountBtn) {

  const accountFragment = document.querySelector('#account-template')?.content;
  const templateAccount = accountFragment.querySelector('.new-organization__bank-account')


  addAccountBtn.addEventListener('click', () => {
    const templateId = uuidv4()
    const accountEl = templateAccount.cloneNode(true)

    const elCheckbox = accountEl.querySelector('.new-organization__checkbox')
    const elCheckboxLabel = accountEl.querySelector('.new-organization__checkbox-label')
    elCheckbox.id = templateId
    elCheckboxLabel.setAttribute('for', templateId)
    accountsContainer.appendChild(accountEl)
  })


  // Удаление счета
  accountsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-organization__remove-account-btn')) {
      const deletedAccount = e.target.closest('.new-organization__bank-account')
      accountsContainer.removeChild(deletedAccount)
    }
  })
}


// Смена длинных placeholder на малых разрешениях
const newOrgShortInput = document.querySelector('input[name="newOrgShortTitle"]')
const newOrgFullInput = document.querySelector('input[name="newOrgFullTitle"]')
const mediaQuery = window.matchMedia('(max-width: 1024px)')


function handleTabletChange (e) {
  if (e.matches) {
    newOrgShortInput.placeholder = 'Краткое название организации'
    newOrgFullInput.placeholder = 'ООО «Полное название»'
  }
}

if (newOrgShortInput) {
  mediaQuery.addListener(handleTabletChange)
  handleTabletChange(mediaQuery)
}




















