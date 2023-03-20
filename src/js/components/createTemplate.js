const createTemplatePage = document.querySelector('.create-template-page')

if (createTemplatePage) {
  const tmplNameInput = createTemplatePage.querySelector('.create-template__input-wrap input')
  const publishBtn = createTemplatePage.querySelector('.create-template__publish-btn')
  const saveBtn = createTemplatePage.querySelector('.create-template__save-btn')

  const toggleInputs = (isValue) => {
    if (isValue) {
      publishBtn.classList.remove('btn_disabled')
      saveBtn.classList.remove('btn_disabled')
    } else {
      publishBtn.classList.add('btn_disabled')
      saveBtn.classList.add('btn_disabled')
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    toggleInputs(tmplNameInput.value.trim())
  })


  tmplNameInput.addEventListener('input', (e) => {
    const inputValue = e.target.value.trim()
    toggleInputs(inputValue)
  })
}
