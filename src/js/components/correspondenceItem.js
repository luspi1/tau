import { checkConfirm, sendData, showInfoModal, } from '../_functions'


const corrItemPage = document.querySelector('.correspondence-item')

if (corrItemPage) {
  const delBtn = corrItemPage.querySelector('.newmail-one__delete-btn')

  const confirmDelBtn = corrItemPage.querySelector('.check-confirm-modal .btn._confirm')
  const handleDeleteSubmit = async () => {
    const data = {
      id: delId
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, delScript)
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        window.location.href = delUrl
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  const delScript = confirmDelBtn.dataset.script
  const delId = confirmDelBtn.dataset.id
  const delUrl = confirmDelBtn.dataset.url

  delBtn.addEventListener('click', (e) => {
    e.preventDefault()
    checkConfirm(() => null)
  })

  confirmDelBtn.addEventListener('click', handleDeleteSubmit)


}
