const createLetterModal = document.querySelector('#create-letter-modal')

if (createLetterModal) {
  const shippingMethodSelect = createLetterModal.querySelector('.modal-create-letter__shipping-select')
  const receiptFileUpload = createLetterModal.querySelector('.modal-create-letter__receipt-file')
  shippingMethodSelect.addEventListener('change', (e) => {
    if (e.detail.value === '5') {
      receiptFileUpload.classList.remove('hidden')
    } else {
      receiptFileUpload.classList.add('hidden')
    }
  })
}
