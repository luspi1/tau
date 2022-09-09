import { sendData, showInfoModal, toggleLoader } from "../_functions";

const sortBtn = document.querySelector('.page-contacts__sort-btn')
const sortInputs = document.querySelectorAll('[data-input="sort"]')


async function handleFormSubmit (event) {
  event.preventDefault()
  const objData = {}

  sortInputs.forEach(input => {
    objData[input.name] = input.value
  })

  const jsonData = JSON.stringify(objData)

  toggleLoader()

  const response = await sendData(jsonData, '/include/ajax/sort_contacts.php')
  const finishedResponse = await response.json()

  toggleLoader()

  const {status, errortext} = finishedResponse
  if (status === 'ok') {
    console.log('отсортировано')
  } else {
    showInfoModal(errortext)
  }
}

sortBtn.addEventListener('click', handleFormSubmit)
