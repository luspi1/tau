import { sendData, showInfoModal, toggleLoader } from "../_functions"

const sortBtn = document.querySelector('.page-contacts__sort-btn')
const sortInputs = document.querySelectorAll('[data-input="sort"]')


if (sortBtn) {

  const dataUrl = sortBtn.dataset.url

  async function handleFormSubmit(event) {
    event.preventDefault()
    const objData = {}

    sortInputs.forEach(input => {
      objData[input.name] = input.value
    })

    const jsonData = JSON.stringify(objData)

    toggleLoader()

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      toggleLoader()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        console.log('отсортировано')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      toggleLoader()
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  sortBtn.addEventListener('click', handleFormSubmit)
}

