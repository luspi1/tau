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
