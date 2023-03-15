const createTemplatePage = document.querySelector('.create-template-page')

if (createTemplatePage) {

  const tmplNameInput = createTemplatePage.querySelector('.create-template__input-wrap')
  const publishBtn = createTemplatePage.querySelector('.create-template__publish-btn')
  const saveBtn = createTemplatePage.querySelector('.create-template__save-btn')


  tmplNameInput.addEventListener('input', (e) => {
    const inputValue = e.target.value.trim()
    if (inputValue) {
      publishBtn.classList.remove('btn_disabled')
      saveBtn.classList.remove('btn_disabled')
    } else {
      publishBtn.classList.add('btn_disabled')
      saveBtn.classList.add('btn_disabled')
    }
  })
}
