const incomingFileBtn = document.querySelector('.modal-incoming__file-wrapper input')

if (incomingFileBtn) {
  incomingFileBtn.addEventListener('change', (e) => {
    e.target.value = ''
    console.log('hello')
  })
}
