import { formToObj, serializeForm } from '../_functions'

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

  // обработка выбора шаблона (Использовать выбранный шаблон)

  const choiceTemplateForm = docTemplateModal.querySelector('.modal-doc-template__form')

  const templateDataInput = document.querySelector('.create-doc-page .create-doc-page__tmpl-input-data')
  const templateInput = document.querySelector('.create-doc-page .create-doc-page__tmpl-input')
  const tmplBasisLink = docTemplateModal.querySelector('.modal-doc-template__template-basis-link')

  choiceTemplateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const templateValue = formToObj(serializeForm(e.currentTarget))
    const templateRadio = choiceTemplateForm.querySelector(`input[value="${templateValue?.templateId}"]`)
    const templateText = templateRadio?.closest('.radio-list__item')?.querySelector('label').textContent.trim()

    templateDataInput.value = templateValue.templateId
    templateInput.value = templateText
    tmplBasisLink.textContent = templateText
    stateModal.dataset.state = 'connected'
  })

}


// Открытие модалки загрузки файла документа из внешнего источника

const downloadDocBtn = document.querySelector('.create-doc-page__download-doc-btn')

if (downloadDocBtn) {
  downloadDocBtn.addEventListener('click', (e) => {
    e.preventDefault()
  })
}
