const contactCardNav = document.querySelector('.contact-card .contact-card__nav')

if (contactCardNav) {
  contactCardNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('contact-card__nav-item') && !e.target.classList.contains('contact-card__nav-item_active')) {

      const contactNavItems = Array.from(e.currentTarget.children)
      contactNavItems.forEach(el => el.classList.remove('contact-card__nav-item_active'))
      e.target.classList.add('contact-card__nav-item_active')

      const dataNav = e.target.dataset.nav
      const cardItems = document.querySelectorAll('.contact-card__changeable-item')
      cardItems.forEach(el => {
        el.classList.remove('contact-card__changeable-item_active')
        if (el.dataset.item === dataNav) {
          el.classList.add('contact-card__changeable-item_active')
        }
      })
    }
  })

}
