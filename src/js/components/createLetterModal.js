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
