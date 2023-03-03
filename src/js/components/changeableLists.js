const deleteBtns = document.querySelectorAll('[data-delete="btn"]')

if (deleteBtns) {
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const deleteTargetEl = e.currentTarget.closest('[data-delete="element"]')
      deleteTargetEl.remove()
    })
  })
}
