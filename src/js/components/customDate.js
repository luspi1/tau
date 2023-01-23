import AirDatepicker from "air-datepicker"

const initAllDates = () => {
  const allDateInputs = document.querySelectorAll('input[data-date-start]')

  if (allDateInputs) {
    allDateInputs.forEach(el => {
      const {dateStart, dateValue} = el.dataset
      if (dateValue) {
        el.value = dateValue
      }
      new AirDatepicker(el, {
        dateStart,
      })
    })
  }
}

initAllDates()


export { initAllDates }
