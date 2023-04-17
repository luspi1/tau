const copyBtns = document.querySelectorAll('.copy-btn')

copyBtns.forEach(btn => {
  const copyField = btn.closest('.copy-field')
  if (copyField) {
    const copyValue = copyField.querySelector('.copy-value')
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyValue.textContent)
    })
  }
})


export const initCopyValues = () => {
  const mainPage = document.querySelector('main')
  mainPage.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-values')) {
      navigator.clipboard.writeText(e.target.textContent)
    }
  })
}

