import { checkConfirm } from '../_functions'

const dealCardPage = document.querySelector('.deal-card-page')

if (dealCardPage) {
  const createContractBtn = dealCardPage.querySelector('.one-deal__link-create')

  createContractBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const contractLink = e.target.href
    const navigateByLink = () => {
      window.location.href = contractLink
    }
    checkConfirm(navigateByLink, 'Вы действительно хотите создать договор?')
  })


}
