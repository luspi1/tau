import { modalOverlay } from "../_vars"

const openModalBtns = document.querySelectorAll('[data-modal]')

if (openModalBtns) {
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const btnCurrentModal = btn.dataset.modal
      const currentPageMain = btn.closest('main')
      const currentModal = document.querySelector(`#${btnCurrentModal}`)

      currentPageMain.style.minHeight = `${currentModal.clientHeight}px`
      currentModal.classList.add('_active')
      modalOverlay.classList.add('modal-overlay_active')
    })
  })
}

const closeModalBtns = document.querySelectorAll('button[data-close-modal]')

if (closeModalBtns) {
  closeModalBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('_active')) {
          modal.classList.remove('_active')
          modal.closest('main').style.minHeight = "calc(100vh - 60px)"
        }
      })
      if (modalOverlay) {
        modalOverlay.classList.remove('modal-overlay_active')
      }
    })
  })
}


if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('modal-overlay_active')
    const activeModal = document.querySelector('.modal._active')
    if (activeModal) {
      activeModal.classList.remove('_active')
      activeModal.closest('main').style.minHeight = "calc(100vh - 60px)"
    }
  })
}


