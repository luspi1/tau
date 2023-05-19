const docTemplateModal = document.querySelector('#doc-template-modal')

if (docTemplateModal) {

  const stateModal = docTemplateModal.querySelector('.modal-doc-template__states')

  const stateBtns = docTemplateModal.querySelectorAll('button[data-state-btn]')

  stateBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      stateModal.dataset.state = e.currentTarget.dataset.stateBtn
    })
  })

}


// Открытие модалки загрузки файла документа из внешнего источника

const downloadDocBtn = document.querySelector('.create-doc-page__download-doc-btn')

if (downloadDocBtn) {
  downloadDocBtn.addEventListener('click', (e) => {
    e.preventDefault()
  })
}
