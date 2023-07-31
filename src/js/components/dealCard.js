import {checkConfirm} from '../_functions'

const dealCardPage = document.querySelector('.deal-card-page')

if (dealCardPage) {
    const createContractBtn = dealCardPage.querySelector('.one-deal__link-create')


    createContractBtn.addEventListener('click', (e) => {
        e.preventDefault()

//проверка наличия шаблона сделки
        if (createContractBtn.dataset.template === '') {
            const contractLink = e.target.href
            const navigateByLink = () => {
                window.location.href = contractLink
            }
            checkConfirm(navigateByLink, 'Вы действительно хотите создать договор?')
        } else {
            const infoModal = document.querySelector('.info-modal.modal')
            infoModal.classList.remove('hidden')
            infoModal.querySelector(
                '.info-modal__content-text').innerHTML = 'Для продолжения работы загрузите <a href="create-template.html">шаблон договора</a>'
            document.body.style.overflow = 'hidden'
            infoModal.addEventListener('click', ({target}) => {
                if (target && target === infoModal) {
                    document.body.style.overflow = ''
                    infoModal.classList.add('hidden')
                }
            })
        }
    })


}
