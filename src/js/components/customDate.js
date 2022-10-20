import AirDatepicker from "air-datepicker";

const dateInput = document.querySelector('.prime-info__date-input .edit-input');

let startDate = new Date('1905-09-08');
new AirDatepicker(dateInput, {
  startDate,
});


const dateIssue = document.querySelector('.passport-modal__date-input');

new AirDatepicker(dateIssue, {
  startDate,
});


const physDatePassport = document.querySelector('input[name="physDatePassport"]');

new AirDatepicker(physDatePassport, {
  startDate,
});


const initDatePayment = () => {
  const datePayments = document.querySelectorAll('.create-case-page__date-input');

  datePayments.forEach(el => {
    new AirDatepicker(el, {
      startDate,
    });
  })
}

initDatePayment()


const initDateDeal = () => {
  const dateCreateDeal = document.querySelectorAll('.create-deal-page__date-input');

  dateCreateDeal.forEach(el => {
    new AirDatepicker(el, {
      startDate,
    });
  })
}
initDateDeal()


const initFiltertCalendar = () => {
  const dateCreateDeal = document.querySelectorAll('.filter__calendar-wrap input');

  dateCreateDeal.forEach(el => {
    new AirDatepicker(el, {
      startDate,
    });
  })
}
initFiltertCalendar();

export { initDatePayment, initDateDeal}
