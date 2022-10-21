const incomePageMain = document.querySelector('.income-page')

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
const incomingManualFill = document.querySelector('.modal-incoming__manual-fill')
const incomingFileFill = document.querySelector('.modal-incoming__file-fill')
const incomingReturnBtn = document.querySelector('.modal-incoming__import-return-btn')

if (incomingFileBtn) {
  incomingFileBtn.addEventListener('change', (e) => {
    e.target.value = ''
    incomingManualFill.classList.remove('modal-incoming__manual-fill_active')
    incomingFileFill.classList.add('modal-incoming__file-fill_active')
  })
}

if (incomingReturnBtn) {
  incomingReturnBtn.addEventListener('click', (e) => {
    incomingManualFill.classList.add('modal-incoming__manual-fill_active')
    incomingFileFill.classList.remove('modal-incoming__file-fill_active')

    const incomingModal = document.querySelector('#incoming-modal')
    incomePageMain.style.minHeight = `${incomingModal.clientHeight}px`
  })
}
