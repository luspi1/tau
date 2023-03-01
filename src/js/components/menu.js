import {removeClasses} from '../_functions'
import {body} from '../_vars'

const menuLinks = document.querySelectorAll('.header-menu__link')


// Переключение активного пункта меню

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.classList.contains('header-menu__link_active')) {
      removeClasses('header-menu__link_active')
      link.classList.add('header-menu__link_active')
    }
  })
})

//Мобильное меню с бургером

const burgerBtn = document.querySelector('.header__nav-burger')
const mobileMenu = document.querySelector('.header__nav-list')

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('_active')
    body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = ''
  })
}
