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


// настройка стилей календаря + на странице /income-traffic/

const filterInputCalendars = document.querySelectorAll('.filter__calendar-input');
const filterCalendarWrappers = document.querySelectorAll('.filter__calendar-wrap');

const trafficInputCalendars = document.querySelectorAll('.traffic__calendar-input');
const trafficCalendarWrappers = document.querySelectorAll('.traffic__calendar-wrap');

if (filterInputCalendars || trafficInputCalendars ) {
function showCustomCalendar(calendarInput, calendarWrap) {
  calendarInput.forEach((inputDate, index) => {
    inputDate.addEventListener('focusout', () => {
      if (inputDate.value != '') {
        calendarWrap[index].classList.add('active')
      }
    })
  });
}

showCustomCalendar(filterInputCalendars, filterCalendarWrappers);
showCustomCalendar(trafficInputCalendars, trafficCalendarWrappers);

function hideCustomCalendar(calendarWrap, calendarInput) {
  calendarWrap.forEach((parent, index) => {
    parent.addEventListener('click', (event) => {
      const target = event.target;
     if (target && target.classList.contains('calendar-cross-close') ) {
      calendarWrap[index].classList.remove('active');
      calendarInput[index].value = '';
      }
    });
  });
}

hideCustomCalendar(filterCalendarWrappers, filterInputCalendars);
hideCustomCalendar(trafficCalendarWrappers, trafficInputCalendars);
};

