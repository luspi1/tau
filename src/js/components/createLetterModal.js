import { parseStringToHtml, sendData, showInfoModal } from '../_functions'

const createLetterModal = document.querySelector('#create-letter-modal')

if (createLetterModal) {

  // показ/скрытие прикрепления квитанции при методе "Курьер"
  const shippingMethodSelect = createLetterModal.querySelector('.modal-create-letter__shipping-select')
  const receiptFileUpload = createLetterModal.querySelector('.modal-create-letter__receipt-file')
  shippingMethodSelect.addEventListener('change', (e) => {
    if (e.detail.value === '5') {
      receiptFileUpload.classList.remove('hidden')
    } else {
      receiptFileUpload.classList.add('hidden')
    }
  })

  // показ/скрытие номера трека при типе "Бумажное"
  const shippingTypeSelect = createLetterModal.querySelector('.modal-create-letter__type-select')
  const trackInput = createLetterModal.querySelector('.modal-create-letter__track-input')
  shippingTypeSelect.addEventListener('change', (e) => {
    if (e.detail.value === '2') {
      trackInput.classList.remove('hidden')
    } else {
      trackInput.classList.add('hidden')
    }
  })

}
// обработка модалок с письмом из документа

export const initDocLetterBtns = () => {
  const docLetterBtns = document.querySelectorAll('.letter-doc-btn')
  const createLetterModal = document?.querySelector('#create-letter-modal')
  const letterModalDocName = createLetterModal?.querySelector('.modal-create-letter__warning-doc-name')
  const letterModalDoc = createLetterModal?.querySelector('.modal-create-letter__sys-doc-list')

  if (docLetterBtns) {
    docLetterBtns.forEach(letterBtn => {
      letterBtn.addEventListener('click', async (e) => {
        const docScript = e.currentTarget.dataset.script
        const docId = e.currentTarget.dataset.id
        const data = {id_doc: docId}
        const jsonData = JSON.stringify(data)
        try {
          const response = await sendData(jsonData, docScript)
          const finishedResponse = await response.json()


          const {status, errortext, html} = finishedResponse
          if (status === 'ok') {
            const htmlEl = parseStringToHtml(html, 'a')
            letterModalDoc.innerHTML = ''
            letterModalDoc.insertAdjacentElement('beforeend', htmlEl)
            letterModalDocName.textContent = htmlEl.textContent
          } else {
            showInfoModal(errortext)
          }
        } catch (err) {
          showInfoModal("Во время выполнения запроса произошла ошибка")
          console.error(err)
        }

      })
    })
  }
}

initDocLetterBtns()


