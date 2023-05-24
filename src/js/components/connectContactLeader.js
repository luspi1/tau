import {
  closeSelectPopups,
  handlePopupInputs,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader,
  updateFieldOnInput
}                                                 from "../_functions"
import { body, modalConnectLeader, modalOverlay } from "../_vars"


const delValueBtn = document.querySelector('.modal-connect-leader__delete-btn')
const searchContactInput = document.querySelector('.modal-connect-leader__input')

if (delValueBtn) {
  delValueBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchContactInput.value = ''
  })
}

if (searchContactInput) {
  searchContactInput.addEventListener('input', handlePopupInputs)
}

// закрытие попап-селектов

const editContactPage = document.querySelector('.edit-contact-page')


// обновление "Указан руководитель" по вводу значений в инпуты ФИО имен. падеж

if (editContactPage) {

  closeSelectPopups(editContactPage)


  // функция обновления руководителя "Указан руководитель"
  const leadFullname = editContactPage.querySelector('.edit-contact__leader-fullname')
  const leadSurname = leadFullname.querySelector('.leader_surname')
  const leadFirstname = leadFullname.querySelector('.leader_firstname')
  const leadFathname = leadFullname.querySelector('.leader_fathname')
  const updateFullname = (surname, firstname, fathname) => {
    leadSurname.textContent = surname
    leadFirstname.textContent = firstname
    leadFathname.textContent = fathname
  }


  //отправка данных о подключении контакта в качестве руководителя

  const connectLeaderForm = editContactPage.querySelector('.modal-connect-leader__form')
  const fullnameInputs = editContactPage.querySelectorAll('.edit-contact__type_entity .edit-contact__fullname-section .edit-contact__input')


// Обработка события отправки

  if (connectLeaderForm) {
    const dataUrl = connectLeaderForm.dataset.url

    async function handleFormSubmit(event) {
      event.preventDefault()
      const data = serializeForm(event.target)
      const arrData = Array.from(data.entries())
      const jsonData = JSON.stringify(arrData)
      toggleLoader()

      try {
        const response = await sendData(jsonData, dataUrl)
        const finishedResponse = await response.json()
        toggleLoader()
        const {status, errortext, surname, firstname, fathname} = finishedResponse
        if (status === 'ok') {
          modalConnectLeader.classList.remove('_active')
          modalOverlay.classList.remove('modal-overlay_active')
          body.classList.remove('_lock')
          updateFullname(surname, firstname, fathname)

          // обновление инпутов фио руководителя
          fullnameInputs.forEach(input => {
            Object.keys(finishedResponse).forEach(key => {
              if (input.name === key) {
                input.value = finishedResponse[key]
              }
            })
          })
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        toggleLoader()
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }


    }


    connectLeaderForm.addEventListener('submit', handleFormSubmit)
  }

  fullnameInputs.forEach(input => {
    const targetTextField = leadFullname.querySelector(`.leader_${input.name}`)
    if (targetTextField) {
      updateFieldOnInput(input, targetTextField)
    }
  })

}









