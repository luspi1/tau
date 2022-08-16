import { removeClasses } from "../_functions";

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
