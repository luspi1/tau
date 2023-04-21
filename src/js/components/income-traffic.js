// фильтр

const incomeTrafficPage = document.querySelector('.income-traffic-page')

if (incomeTrafficPage) {
  const filterButtons = document.querySelectorAll('.traffic__btn[data-traffic]')
  const hiddenInput = document.querySelector('#traffic-hidden-input')
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      filterButtons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')
      hiddenInput.value = button.dataset.traffic
    })
  })
}



