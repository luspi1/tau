//аккордеоны

const accordions = document.querySelectorAll('.months__accordion');
const monthsItems = document.querySelectorAll('.months__item');

if (accordions) {
  accordions.forEach((parent, index) => {
    parent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('months__arrow')) {
        target.classList.toggle('active');
        monthsItems[index].classList.toggle('active');
      }
    });
  });
};


// модалка прихода
const incomingFileBtn = document.querySelector('.modal-incoming__file-wrapper input')

if (incomingFileBtn) {
  incomingFileBtn.addEventListener('change', (e) => {
    e.target.value = ''
    console.log('hello')
  })
}
