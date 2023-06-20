import { sendData, showInfoModal }         from '../_functions'
import { handleCloseDealModal }            from './closeDealModal'
import { handleCreateDocLetterModal }      from './createLetterModal'
import { initAllDates }                    from './customDate'
import { initSelects }                     from './customSelect'
import { handleDocumentPreviewModal }      from './documentPreviewModal'
import { handleDocumentSendModal }         from './documentSendModal'
import { initFileUploading }               from './fileUpload'
import { initAllMasks }                    from './inputMask'
import { initCloseModals, initOpenModals } from './managePopup'
import { handleDocumentSignModal }         from './signDocModal'


const initGeneratedModal = (modal) => {
  //инициализация всех кастомных библиотек
  initCloseModals()
  initOpenModals()
  initSelects()
  initAllDates()
  initAllMasks()
  initFileUploading()

  //обработка конкретных модалок
  handleDocumentSignModal(modal)  // Модалка подписания документа
  handleDocumentPreviewModal(modal)  // Модалка предпросмотра документа
  handleCloseDealModal(modal) // Модалка закрытия сделки
  handleDocumentSendModal(modal) // Модалка отправки документа
  handleCreateDocLetterModal(modal) // Модалка создания письма из документа
}


export const handleGeneratedBtn = async (e) => {
  const generatedModalId = e.currentTarget.dataset.modal
  const generatedModal = document.querySelector(`#${generatedModalId}`)

  const generateId = e.currentTarget.dataset.id
  const generateScript = e.currentTarget.dataset.script

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
  } catch (err) {
    showInfoModal("Во время выполнения запроса произошла ошибка")
    console.error(err)
  }
}

const initGeneratedBtns = () => {
  const generatedModalBtns = document.querySelectorAll('button[data-type-btn="generated"]')
  if (generatedModalBtns) {
    generatedModalBtns.forEach(btn => {
      btn.addEventListener('click', handleGeneratedBtn)
    })
  }
}


initGeneratedBtns()
