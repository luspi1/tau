// Валидация
import {
  closeSelectPopups,
  formToObj,
  handlePopupInputs, sendData,
  serializeForm,
  showInfoModal
}                       from '../_functions'
import { modalOverlay } from '../_vars'


const editFullnameForm = document.querySelector('.modal-join-director__wrap')
if (editFullnameForm) {
  editFullnameForm.addEventListener('input', (e) => {
    const inputTarget = e.target
    const currentErrorMessage = inputTarget.closest('.modal-fullname__item').querySelector('.error-message')
    if (!inputTarget.validity.valid) {
      inputTarget.parentElement.classList.add('invalid')
      currentErrorMessage.classList.add('_active')
    } else {
      inputTarget.parentElement.classList.remove('invalid')
      currentErrorMessage.classList.remove('_active')
    }
    if (inputTarget.value) {
      inputTarget.classList.add('modal-fullname__input_active')
    } else {
      inputTarget.classList.remove('modal-fullname__input_active')
    }
  })
  editFullnameForm.addEventListener('focusin', (e) => {
    const inputTarget = e.target
    inputTarget.classList.add('modal-fullname__input_active')
  })
  editFullnameForm.addEventListener('focusout', (e) => {
    const inputTarget = e.target

    if (!inputTarget.value) {
      inputTarget.classList.remove('modal-fullname__input_active')
    }
  })
}


// логика поиска руководителя
const newOrgPage = document.querySelector('.new-organization')

if (newOrgPage) {
  const joinLeaderModal = newOrgPage.querySelector('#join-director-modal')
  const joinLeaderPopupInput = joinLeaderModal.querySelector('.modal-join-director__input')
  const joinLeaderBtn = joinLeaderModal.querySelector('.modal-join-director__connect-btn')
  const joinLeaderModalValueInput = joinLeaderModal.querySelector('.select-popup-data[name="id_leader_search"]')
  const joinLeaderValueInput = newOrgPage.querySelector('.new-organization__input-leader-id')

  if (joinLeaderPopupInput) {
    joinLeaderPopupInput.addEventListener('input', handlePopupInputs)
    // закрытие попап-селектов
    closeSelectPopups(newOrgPage)
  }

  joinLeaderBtn.addEventListener('click', (e) => {
    e.preventDefault()
    joinLeaderValueInput.value = joinLeaderModalValueInput.value
    joinLeaderModal.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
  })


  // подключение руководителя через ввод данных в инпуты фио

  const saveDataBtn = joinLeaderModal.querySelector('.modal-fullname__save-btn')
  const fullNameForm = joinLeaderModal.querySelector('.modal-join-director__wrap')
  const fullNameLeader = document.querySelector('.new-organization__leader-fullname')

  const dataScript = saveDataBtn.dataset.script
  const addData = JSON.parse(saveDataBtn.dataset.json)
  fullNameForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = serializeForm(e.target)
    const objData = formToObj(data)
    const totalData = {...objData, ...addData}
    const jsonData = JSON.stringify(totalData)
    const fullnameString = `${objData.surname} ${objData.firstname} ${objData.fathname}`

    try {
      const response = await sendData(jsonData, dataScript)
      const finishedResponse = await response.json()
      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        joinLeaderModal.classList.remove('_active')
        modalOverlay.classList.remove('modal-overlay_active')
        fullNameLeader.textContent = fullnameString
        joinLeaderValueInput.value = 0
      } else {
        showInfoModal(errortext)
      }
    } catch {
      showInfoModal("Во время выполнения запроса произошла ошибка")
    }
  })


}






