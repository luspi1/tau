import {formToObj, sendData, serializeForm, showInfoModal} from '../_functions'
import {body, modalOverlay} from '../_vars'


export const handleCloseDealModal = (closeDealModal) => {
  const formSubmitDealModal = (form, dataScript) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const data = serializeForm(e.target)
      const objData = formToObj(data)
      const jsonData = JSON.stringify(objData)

      try {
        const response = await sendData(jsonData, dataScript)
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse

        if (status === 'ok') {
          document.querySelector('.main').classList.toggle('_closed')

          body.classList.remove('_lock')
          modalOverlay.classList.remove('modal-overlay_active')
          document.querySelectorAll('.modal').forEach(modal => {
            if (modal.classList.contains('_active')) {
              modal.classList.remove('_active')
            }
          })

        } else {
          showInfoModal(errortext)
        }
      } catch {
          showInfoModal("Во время выполнения запроса произошла ошибка")
      }

    })
  }
  if (closeDealModal.classList.contains('closed-deal')) {
    const submitBtn = closeDealModal.querySelector('.closed-deal__btn-submit')
    const dataScript = submitBtn.dataset.script
    const formClosedDeal = closeDealModal.querySelector('#form-closed-deal')
    const dataId = formClosedDeal.querySelector('input[name="id_deal"]')
    dataId.value = closeDealModal.dataset.id

    formSubmitDealModal(formClosedDeal, dataScript)
  }

  if (closeDealModal.classList.contains('open-deal')) {
    const openSubmitBtn = closeDealModal.querySelector('.open-deal__btn-submit')
    const dataScript = openSubmitBtn.dataset.script
    const formOpenDeal = closeDealModal.querySelector('#form-open-deal')
    const openDataId = formOpenDeal.querySelector('input[name="id_deal"]')
    openDataId.value = closeDealModal.dataset.id

    formSubmitDealModal(formOpenDeal, dataScript)
  }
}
