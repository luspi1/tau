import {
  blockFields,
  closeSelectPopups,
  handlePopupInputs,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader
}                                                 from "../_functions"
import { body, modalConnectLeader, modalOverlay } from "../_vars"


const delValueBtn = document.querySelector('.modal-connect-leader__delete-btn')
const searchContactInput = document.querySelector('.modal-connect-leader__input')
const fullnameInputsWrapper = document.querySelectorAll('.edit-contact__fullname-section .edit-contact__input-wrapper')

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

closeSelectPopups(editContactPage)


//отправка данных о подключении контакта в качестве руководителя

const connectLeaderForm = document.querySelector('.modal-connect-leader__form')

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
      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        modalConnectLeader.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        body.classList.remove('_lock')
        blockFields(fullnameInputsWrapper)
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












