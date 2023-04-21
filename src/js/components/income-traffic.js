// фильтр

const filterButtons = document.querySelectorAll('.traffic__btn[data-traffic]')
const hiddenInput = document.querySelector('#traffic-hidden-input')

let dataButtonFilter = ''

filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    filterButtons.forEach(btn => {
      btn.classList.remove('active')
    })
    button.classList.add('active')
    dataButtonFilter = button.dataset.traffic
    hiddenInput.value = dataButtonFilter
  })
})

