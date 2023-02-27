import Choices                  from 'choices.js'
import { toggleRequiredFields } from '../_functions'

const incomePageMain = document.querySelector('.income-page')

if (incomePageMain) {

//аккордеоны

  const accordions = document.querySelectorAll('.months__accordion')
  const monthsItems = document.querySelectorAll('.months__item')

  if (accordions) {
    accordions.forEach((parent, index) => {
      parent.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains('months__arrow')) {
          target.classList.toggle('active')
          monthsItems[index].classList.toggle('active')
        }
      })
    })
  }


// модалка прихода
  const incomingFileBtn = document.querySelector('.modal-incoming__file-wrapper input')
  const incomingManualFill = document.querySelector('.modal-incoming__manual-fill')
  const incomingFileFill = document.querySelector('.modal-incoming__file-fill')
  const incomingReturnBtn = document.querySelector('.modal-incoming__import-return-btn')

  const requiredFields = document.querySelectorAll('.modal-incoming input[data-required]')


  if (incomingFileBtn) {
    incomingFileBtn.addEventListener('change', (e) => {
      e.target.value = ''
      incomingManualFill.classList.remove('modal-incoming__manual-fill_active')
      incomingFileFill.classList.add('modal-incoming__file-fill_active')
      toggleRequiredFields(requiredFields)

    })
  }

  if (incomingReturnBtn) {
    incomingReturnBtn.addEventListener('click', (e) => {
      incomingManualFill.classList.add('modal-incoming__manual-fill_active')
      incomingFileFill.classList.remove('modal-incoming__file-fill_active')
      const incomingModal = document.querySelector('#incoming-modal')
      incomePageMain.style.minHeight = `${incomingModal.clientHeight}px`
      toggleRequiredFields(requiredFields)
    })
  }


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

//Связка значения инпут с контентом

  const monthsButtons = document.querySelectorAll('.months__button')

  const incomeSelect = incomePageMain?.querySelector('.modal-incoming__select-wrapper-payment select')


  const incomeChoices = new Choices(incomeSelect, {
    itemSelectText: '',
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true
  })


  if (monthsButtons) {
    monthsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const incomeMonthCompany = document.querySelector(
          '.title__select-wrap .choices__item.choices__item--selectable').textContent
        const incomeMonthRow = btn.closest('.months__row')
        const incomeMonthDeal = incomeMonthRow.querySelector('.months__deal').textContent
        const incomeMonthAgent = incomeMonthRow.querySelector('.months__organization').textContent
        const incomePayment = incomeMonthRow.querySelector('.months__payment').textContent

        const inputCompany = document.querySelector(
          '.modal-incoming__input[name="incoming_company-title"]')
        const inputAgent = document.querySelector('.modal-incoming__input[name="incoming_agent"]')
        const inputDealTitle = document.querySelector(
          '.modal-incoming__input[name="incoming_deal-title"]')

        const defaultValuesModal = (inputName, textContent) => {
          inputName.value = textContent
          inputName.disabled = true
          inputName.closest('.modal-incoming__input-wrapper').classList.add('input_disabled')
         }

        defaultValuesModal(inputCompany, incomeMonthCompany)
        defaultValuesModal(inputAgent, incomeMonthAgent)
        defaultValuesModal(inputDealTitle, incomeMonthDeal)

        incomeChoices.destroy()
        incomeChoices.init()
        incomeChoices.setValue([{value: incomePayment, label: incomePayment}])
      })
    })
  }
}





