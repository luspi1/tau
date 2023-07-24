import {
    formToObj,
    sendData,
    serializeForm,
    showInfoModal,
    toggleLoader,
    updateFields
} from '../_functions'
import {modalOverlay, modalPassport} from '../_vars'


const passportForm = document.querySelector('.passport-modal__form')
const docPage = document.querySelector('.page-doc')
const passportUpdatableFields = docPage?.querySelectorAll('[data-updField]')

// Обработка события отправки

if (passportForm) {

    const dataUrl = passportForm.dataset.url

    async function handleFormSubmit(event) {
        event.preventDefault()

        const data = serializeForm(event.target)
        const objData = formToObj(data)
        const jsonData = JSON.stringify(objData)
        toggleLoader()

        try {
            const response = await sendData(jsonData, dataUrl)
            const finishedResponse = await response.json()

            toggleLoader()

            const {status, errortext} = finishedResponse
            if (status === 'ok') {
                updateFields(objData, passportUpdatableFields)
                modalPassport.classList.remove('_active')
                modalOverlay.classList.remove('modal-overlay_active')
            } else {
                showInfoModal(errortext)
            }
        } catch (err) {
            toggleLoader()
            showInfoModal('Во время выполнения запроса произошла ошибка')
            console.error(err)
        }
    }

    passportForm.addEventListener('submit', handleFormSubmit)
}

// Валидация

if (passportForm) {
    passportForm.addEventListener('input', (e) => {
        const inputTarget = e.target
        if (!inputTarget.validity.valid) {
            inputTarget.parentElement.classList.add('invalid')
        } else {
            inputTarget.parentElement.classList.remove('invalid')
        }
        if (inputTarget.value) {
            inputTarget.classList.add('passport-modal__input_active')
        } else {
            inputTarget.classList.remove('passport-modal__input_active')
        }
    })
}

// СНИЛС и ИНН

const editDocWrappers = document.querySelectorAll('.edit-doc-wrapper')

if (editDocWrappers) {
    editDocWrappers.forEach(wrapper => {
        const editBtn = wrapper.querySelector('.edit-btn')
        const editValue = wrapper.querySelector('.edit-value')
        const editableWrapper = wrapper.querySelector('.page-doc__editable-wrapper')
        const editInputWrapper = wrapper.querySelector('.edit-doc-wrapper__input')
        const editInput = wrapper.querySelector('.edit-doc-wrapper__input input')
        const agreeBtn = wrapper.querySelector('.agree-btn')
        const closeBtn = wrapper.querySelector('.close-btn')
        const dataUrl = wrapper.dataset.url
        const values = document.querySelectorAll('.copy-value.edit-value')

        values.forEach(item => {
            if (!item?.textContent.trim().length) {
                item.closest('.edit-doc-wrapper').classList.add('_hidden')
            }
        })

        editBtn.addEventListener('click', (e) => {
            e.preventDefault()
            editableWrapper.style.visibility = 'hidden'
            editInputWrapper.classList.add('_active')
            editInput.value = editValue.textContent
            editInput.focus()
        })

        agreeBtn.addEventListener('click', async (e) => {
            e.preventDefault()

            const inputName = editInput.name
            const inputValue = editInput.value

            const inputData = {
                fieldname: inputName,
                fieldvalue: inputValue,
            }
            const jsonData = JSON.stringify(inputData)

            toggleLoader()

            try {
                const response = await sendData(jsonData, dataUrl)
                const finishedResponse = await response.json()

                toggleLoader()

                const {status, errortext} = finishedResponse
                if (status === 'ok') {
                    editValue.textContent = inputValue
                    editInputWrapper.classList.remove('_active')
                    editableWrapper.style.visibility = 'visible'
                } else {
                    showInfoModal(errortext)
                }
            } catch (err) {
                toggleLoader()
                showInfoModal('Во время выполнения запроса произошла ошибка')
                console.error(err)
            }
        })

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            editInputWrapper.classList.remove('_active')
            editableWrapper.style.visibility = 'visible'
        })
    })
}

//Проверка наличия паспортных данных

const passportNum = document.querySelector('[data-updfield="passport_num"]')
const passportList = document.querySelector('.page-doc__passport-list')

if (!passportNum?.textContent.trim().length && passportList) {
    passportList.innerHTML = '<p class="page-doc__item-title">Паспортные данные еще не были загружены</p>'
}

// Переключение адреса проживания по постоянной или временной регистрации

const regCheckboxes = document.querySelectorAll('.passport-modal__reg-checkbox')
const checkField = document.querySelector('.passport-modal__item-check')

if (regCheckboxes) {
    regCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const checkedInputs = document.querySelectorAll('.passport-modal__reg-checkbox:checked')
            if (checkedInputs.length) {
                checkField.classList.add('passport-modal__item-check_disabled')
            } else {
                checkField.classList.remove('passport-modal__item-check_disabled')
            }


            if (checkedInputs.length > 1) {
                checkedInputs.forEach(el => {
                    if (el !== e.target) {
                        el.checked = false
                    }
                })
            }
        })
    })
}








