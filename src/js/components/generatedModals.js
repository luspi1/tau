import {sendData, showInfoModal} from '../_functions'
import {initAllDates} from './customDate'
import {initSelects} from './customSelect'
import {handleDocumentPreviewModal} from './documentPreviewModal'
import {initCustomMasks} from './inputMask'
import {initCloseModals} from './managePopup'
import {handleDocumentSignModal} from './signDocModal'
import {handleCloseDealModal} from './closeDealModal'

const generatedModalBtns = document.querySelectorAll('button[data-type-btn="generated"]')


const initGeneratedModal = (modal) => {
  //инициализация всех кастомных библиотек
  initCloseModals()
  initSelects()
  initAllDates()
  initCustomMasks()

  //обработка конкретных модалок
  handleDocumentSignModal(modal)  // Модалка подписания документа
  handleDocumentPreviewModal(modal)  // Модалка предпросмотра документа
  handleCloseDealModal(modal)
}


if (generatedModalBtns) {

  generatedModalBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const generatedModalId = e.currentTarget.dataset.modal
      const generatedModal = document.querySelector(`#${generatedModalId}`)

      const generateId = btn.dataset.id
      const generateScript = btn.dataset.script

      const paymentData = {id: generateId}
      const jsonPaymentData = JSON.stringify(paymentData)

      try {
        const response = await sendData(jsonPaymentData, generateScript)
        const finishedResponse = await response.json()
        const {status, errortext, html} = finishedResponse

        if (status === 'ok') {
          generatedModal.innerHTML = html
          generatedModal.setAttribute('data-id', generateId)
          initGeneratedModal(generatedModal)
        } else {
          showInfoModal(errortext)
        }
      } catch (error) {
        console.error(error)
          showInfoModal("Во время выполнения запроса произошла ошибка")
      }
    })
  })
}
