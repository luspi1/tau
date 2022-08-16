import AirDatepicker from "air-datepicker";

const dateInput = document.querySelector('.prime-info__date-input .edit-input');


let startDate = new Date('1905-09-08');
new AirDatepicker(dateInput, {
  startDate,
});

