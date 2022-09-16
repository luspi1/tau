import { formToObj, sendData, serializeForm, showInfoModal, toggleLoader } from "../_functions";

const newOrgForm = document.querySelector('.new-organization__form')
const addAccountBtn = document.querySelector('.new-organization__add-account button')
const accountsContainer = document.querySelector('.new-organization__account-list')

let accountCount = 2;

// Обработка события отправки

if (newOrgForm) {

  async function handleFormSubmit (event) {
    event.preventDefault()

    const data = serializeForm(event.target)
    const objData = formToObj(data)
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    const response = await sendData(jsonData, '/include/ajax/new_org.php')
    const finishedResponse = await response.json()

    toggleLoader()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      window.location.href = 'organizations.html';
    } else {
      showInfoModal(errortext)
    }
  }

  newOrgForm.addEventListener('submit', handleFormSubmit)

}


// Добавление еще одного счета

if (addAccountBtn) {
  addAccountBtn.addEventListener('click', () => {

    const bankAccount = `<div class="new-organization__section new-organization__bank-account">
            <h2 class="new-organization__section-title">
              Банковский счет №${accountCount}
            </h2>
            <div
              class="new-organization__input-wrapper new-organization__checkbox-wrapper">
              <input type="radio" class="new-organization__checkbox"
                     id="checkMasterAccount${accountCount}" name="newOrgCheckMasterAccount" value="isMasterAccount">
              <label for="checkMasterAccount${accountCount}">Сделать этот счет основным для организации</label>
            </div>
            <div class="new-organization__item new-organization__bank-item">
              <div class="new-organization__item-wrapper new-organization__requisites-more">
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    Название счета
                  </p>
                  <input class="new-organization__input"
                         name="newOrgAccountName"
                         type="number">
                </div>
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    Рассчетный счет
                  </p>
                  <input class="new-organization__input"
                         name="newOrgCheckingAccount"
                         type="text">
                </div>
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    Название банка
                  </p>
                  <input class="new-organization__input"
                         name="newOrgBankName"
                         type="number">
                </div>
              </div>
            </div>
            <div class="new-organization__item">

              <div class="new-organization__item-wrapper new-organization__requisites-more">
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    БИК
                  </p>
                  <input class="new-organization__input"
                         name="newOrgIdentificationCode"
                         type="text">
                </div>
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    Корреспондентский счет
                  </p>
                  <input class="new-organization__input"
                         name="newOrgCorrespondentAccount"
                         type="number">
                </div>
                <div
                  class="new-organization__input-wrapper">
                  <p class="new-organization__input-title">
                    Лицевой счет
                  </p>
                  <input class="new-organization__input"
                         name="newOrgBankBook"
                         type="number">
                </div>
              </div>
            </div>
            <button class="new-organization__remove-account-btn" type="button">Удалить этот счет</button>
          </div>`

    accountsContainer.insertAdjacentHTML('beforeend', bankAccount)
    accountCount++
  })

  accountsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-organization__remove-account-btn')) {
      const deletedAccount = e.target.closest('.new-organization__bank-account')
      accountsContainer.removeChild(deletedAccount)
      accountCount--
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




















