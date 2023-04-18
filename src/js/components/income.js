import {
  checkConfirm,
  sendData,
  showInfoModal,
  toggleLoader,
  togglePaymentState
} from '../_functions'

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


  // Удаление months__accordion с подтверждением от сервера

  incomePageMain.addEventListener('click', (e) => {
    if (e.target.classList.contains('months__button-delete')) {
      const delBtn = e.target
      const delEl = delBtn.closest('.months__accordion[data-delete="element"]')
      const delElId = delEl.dataset.id
      const delScript = delBtn.dataset.script

      const paymentWrapper = delBtn.closest('.months__row')
      const paymentCheckBtn = paymentWrapper.querySelector('.months__indicators .months__circle')
      const paymentCloseBtn = paymentWrapper.querySelector('.months__button-close')
      const handleDelMonthEl = async () => {
        const data = {id_deal_payment: delElId}
        const jsonData = JSON.stringify(data)

        toggleLoader()

        try {
          const response = await sendData(jsonData, delScript)
          const finishedResponse = await response.json()

          toggleLoader()

          const {status, errortext} = finishedResponse
          if (status === 'ok') {
            delEl.remove()
            if (paymentCheckBtn.classList.contains('green')) {
              togglePaymentState(paymentCheckBtn, paymentCloseBtn)
            }
          } else {
            showInfoModal(errortext)
          }
        } catch (err) {
          toggleLoader()
          showInfoModal("Во время выполнения запроса произошла ошибка")
          console.error(err)
        }
      }
      checkConfirm(handleDelMonthEl)
    }
  })
}





