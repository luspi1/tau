import {
  formToObj,
  parseStringToHtml,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader
} from '../_functions'

const changeEmployeeModal = document.querySelector('#change-employee-modal')

if (changeEmployeeModal) {

  //отправка данных из формы "Заменить исполнителя"

  const executorForm = changeEmployeeModal.querySelector('.change-employee__executor-form')
  const executorFio = executorForm.querySelector('.change-employee__surname')
  const dealId = changeEmployeeModal.querySelector('h2[data-deal-id]').dataset.dealId

  executorForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = serializeForm(e.target)
    const objData = {
      ...formToObj(data),
      id_deal: dealId
    }
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    try {
      const response = await sendData(jsonData, e.target.action)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext, fio} = finishedResponse

      if (status === 'ok') {
        executorFio.textContent = fio
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  })

  //отправка данных из формы "Добавить наблюдателя"

  const observerForm = changeEmployeeModal.querySelector('.change-employee__observer-form')
  const observerList = observerForm.querySelector('.change-employee__list')
  const observerFormScript = observerForm.action
  observerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = serializeForm(e.target)
    const objData = {
      ...formToObj(data),
      type: 'add',
      id_deal: dealId
    }
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    try {
      const response = await sendData(jsonData, observerFormScript)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext, html} = finishedResponse

      if (status === 'ok') {
        observerList.insertAdjacentElement('beforeend', parseStringToHtml(html, 'li'))
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  })

  //удаление наблюдателей из списка

  observerList.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const currentDelBtn = e.target
      const data = {
        type: 'delete',
        id_person: currentDelBtn.dataset.id,
        id_deal: dealId
      }
      const jsonData = JSON.stringify(data)

      toggleLoader()

      try {
        const response = await sendData(jsonData, observerFormScript)
        const finishedResponse = await response.json()
        toggleLoader()

        const {status, errortext} = finishedResponse

        if (status === 'ok') {
          currentDelBtn.parentElement.remove()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        toggleLoader()
        showInfoModal("Во время выполнения запроса произошла ошибка")
        console.error(err)
      }
    }
  })
}
