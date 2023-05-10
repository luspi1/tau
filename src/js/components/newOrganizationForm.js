import {v4 as uuidv4} from 'uuid'
import {checkValue, formToObj, sendData, serializeForm, showInfoModal} from '../_functions'
import {modalOverlay} from '../_vars'
import {initAccountCheckMask, initBikMask, initCorrMask} from './inputMask'


const addAccountBtn = document.querySelector('.new-organization__add-account button')
const accountsContainer = document.querySelector('.new-organization__account-list')


// Добавление еще одного счета

if (addAccountBtn) {

    const accountFragment = document.querySelector('#account-template')?.content
    const templateAccount = accountFragment.querySelector('.new-organization__bank-account')


    addAccountBtn.addEventListener('click', () => {

        const changeableList = document.querySelector('.new-organization__account-list')
        const changeableInputs = changeableList.querySelectorAll('input')
        if (!checkValue(changeableInputs)) {
            showInfoModal('Для создания нового элемента необходимо заполнить все предыдущие поля!')
            return
        }

        const templateId = uuidv4()
        const accountEl = templateAccount.cloneNode(true)
        const elCheckbox = accountEl.querySelector('.new-organization__checkbox')
        const elCheckboxLabel = accountEl.querySelector('.new-organization__checkbox-label')
        elCheckbox.id = templateId
        elCheckboxLabel.setAttribute('for', templateId)
        accountsContainer.appendChild(accountEl)
        initAccountCheckMask()
        initBikMask()
        initCorrMask()
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


function handleTabletChange(e) {
    if (e.matches) {
        newOrgShortInput.placeholder = 'Краткое название организации'
        newOrgFullInput.placeholder = 'ООО «Полное название»'
    }
}

if (newOrgShortInput) {
    mediaQuery.addListener(handleTabletChange)
    handleTabletChange(mediaQuery)
}


// Передача значения чекбоксов

const accountList = document.querySelector('.new-organization__account-list')
if (accountList) {
    accountList.addEventListener('click', (e) => {
        if (e.target.classList.contains('new-organization__checkbox')) {
            const checkValueInputs = accountList.querySelectorAll(
                '.new-organization__checkbox-value')
            const targetValueInput = e.target.closest('.new-organization__bank-account')
                .querySelector('.new-organization__checkbox-value')
            checkValueInputs.forEach(el => {
                el.value = '0'
            })
            targetValueInput.value = '1'
        }
    })
}

// Логика radio btn совпадений адресов

const newOrgRadioBtns = document.querySelectorAll(
    '.new-organization__form .new-organization__checkbox')

const setMatches = (setInputs, radioType) => {
    let inputsOnType
    switch (radioType) {
        case 'juristic':
            inputsOnType = document.querySelectorAll(
                '.new-organization__form .new-organization__juristic-type .new-organization__input')
            break
        case 'mail':
            inputsOnType = document.querySelectorAll(
                '.new-organization__form .new-organization__mail-type .new-organization__input')
            break
        case 'empty':
            inputsOnType = []
    }

    setInputs?.forEach((el, i) => {
        if (inputsOnType[i]?.value) {
            el.value = inputsOnType[i].value
        } else {
            el.value = ''
        }
    })
}

newOrgRadioBtns.forEach(el => {
    el.addEventListener('input', (e) => {

        let setInputs = e.target.closest('.new-organization__item')
            ?.querySelectorAll('.new-organization__input')

        switch (e.target.value) {
            case 'matchesJuristic' :
                setMatches(setInputs, 'juristic')
                break
            case 'matchesMail' :
                setMatches(setInputs, 'mail')
                break
            default :
                setMatches(setInputs, 'empty')
                break
        }
    })
})



