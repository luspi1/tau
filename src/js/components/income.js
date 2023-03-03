import Choices from 'choices.js'
import {toggleRequiredFields} from '../_functions'

const incomePageMain = document.querySelector('.income-page')

if (incomePageMain) {

  //аккордеоны

 document.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('months__arrow')) {
      target.classList.toggle('active')
      target.closest('.months__accordion').querySelector('.months__item').classList
        .toggle('active')
    }
  })


// настройка стилей календаря + на странице /income-traffic/

  const filterInputCalendars = document.querySelectorAll('.filter__calendar-input')
  const filterCalendarWrappers = document.querySelectorAll('.filter__calendar-wrap')

  const trafficInputCalendars = document.querySelectorAll('.traffic__calendar-input')
  const trafficCalendarWrappers = document.querySelectorAll('.traffic__calendar-wrap')

  if (filterInputCalendars || trafficInputCalendars) {
    function showCustomCalendar(calendarInput, calendarWrap) {
      calendarInput.forEach((inputDate, index) => {
        inputDate.addEventListener('focusout', () => {
          if (inputDate.value !== '') {
            calendarWrap[index].classList.add('active')
          }
        })
      })
    }

    showCustomCalendar(filterInputCalendars, filterCalendarWrappers)
    showCustomCalendar(trafficInputCalendars, trafficCalendarWrappers)

    function hideCustomCalendar(calendarWrap, calendarInput) {
      calendarWrap.forEach((parent, index) => {
        parent.addEventListener('click', (event) => {
          const target = event.target
          if (target && target.classList.contains('calendar-cross-close')) {
            calendarWrap[index].classList.remove('active')
            calendarInput[index].value = ''
          }
        })
      })
    }

    hideCustomCalendar(filterCalendarWrappers, filterInputCalendars)
    hideCustomCalendar(trafficCalendarWrappers, trafficInputCalendars)
  }

}





