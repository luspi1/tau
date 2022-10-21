'use strict'


const accordeons = document.querySelectorAll('.months__accordeon');
const monthsItems = document.querySelectorAll('.months__item');

if (accordeons) {
  accordeons.forEach((parent, index) => {
    parent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('months__arrow')) {
        target.classList.toggle('active');
        monthsItems[index].classList.toggle('active');
      }
    });
  });
};



