const dealDocPage = document.querySelector('.page-deals .deals-documents')

if (dealDocPage) {
  const filterTitle = dealDocPage.querySelector('.deals-documents__filter-title')

  const titleInfo = dealDocPage.querySelector('.deals-documents__info')
  const titleRaw = dealDocPage.querySelector('.deals-documents-table__title-row')

  filterTitle.addEventListener('click', (e => {
    if (!e.target.classList.contains('_active')) {
      filterTitle.querySelectorAll('button').forEach(el => el.classList.remove('_active'))
      e.target.classList.add('_active')
      titleInfo.classList.toggle('hidden')
      titleRaw.classList.toggle('hidden')
    }
  }))

}
