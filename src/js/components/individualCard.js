const individualCardNav = document.querySelector('.individual-card .individual-card__nav')

if (individualCardNav) {
  individualCardNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('individual-card__nav-item') && !e.target.classList.contains('individual-card__nav-item_active')) {

      const individualNavItems = Array.from(e.currentTarget.children)
      individualNavItems.forEach(el => el.classList.remove('individual-card__nav-item_active'))
      e.target.classList.add('individual-card__nav-item_active')

      const dataNav = e.target.dataset.nav
      const cardItems = document.querySelectorAll('.individual-card__changeable-item')
      cardItems.forEach(el => {
        el.classList.remove('individual-card__changeable-item_active')
        if (el.dataset.item === dataNav) {
          el.classList.add('individual-card__changeable-item_active')
        }
      })
    }
  })

}
