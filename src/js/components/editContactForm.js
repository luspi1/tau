import {
  formToObj,
  sendData,
  serializeForm,
  showInfoModal,
  toggleLoader
} from "../_functions";


const editContactForm = document.querySelector('.edit-contact__form')
const entityRequiredFields = document.querySelectorAll('input[data-required="entity"]')
const entityIndividualFields = document.querySelectorAll('input[data-required="individual"]')


// Переключение обязательных полей в зависимости от типа контакта

const toggleRequiredFields = (typeFields) => {
  if (typeFields === 'entity') {
    entityIndividualFields.forEach(el => {
      el.required = false
    })
    entityRequiredFields.forEach(el => {
      el.required = true
    })
    return
  }

  entityRequiredFields.forEach(el => {
    el.required = false
  })
  entityIndividualFields.forEach(el => {
    el.required = true
  })

}

toggleRequiredFields('entity')

// Переключения контента формы в зависимости от типа контакта

const typeSelect = document.querySelector('.edit-contact__contact-type-btn')

if (typeSelect) {
  typeSelect.addEventListener('change', (e) => {
    toggleRequiredFields(e.target.value)
    editContactForm.dataset.contact = e.target.value
  })
}


// Обработка события отправки

if (editContactForm) {

  const submitBtns = document.querySelectorAll('button[type="submit"]')

  async function handleFormSubmit (event) {
    event.preventDefault()

    const data = serializeForm(event.target)
    const objData = formToObj(data)
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    const response = await sendData(jsonData, '/include/ajax/edit_contact.php')
    const finishedResponse = await response.json()

    toggleLoader()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      window.location.href = 'contacts.html';
    } else {
      showInfoModal(errortext)
    }
    editContactForm.removeEventListener('submit', handleFormSubmit)
  }


  async function handleContragentSubmit (event) {
    event.preventDefault()
    const objData = {
      id_contact: event.submitter.dataset.id
    }
    const jsonData = JSON.stringify(objData)

    toggleLoader()

    const response = await sendData(jsonData, '/include/ajax/make_contragent.php')
    const finishedResponse = await response.json()

    toggleLoader()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      showInfoModal('Контакт успешно сделан контрагентом')
    } else {
      showInfoModal(errortext)
    }
    editContactForm.removeEventListener('submit', handleContragentSubmit)
  }


    if (submitBtns) {

      submitBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          if (e.target.classList.contains('contragent-btn')) {
            editContactForm.addEventListener('submit', handleContragentSubmit)
          } else {
            editContactForm.addEventListener('submit', handleFormSubmit)
          }
        })
      })
    }
}



// Смена длинных placeholder на малых разрешениях
const contactInputFullname = document.querySelector('input[name="editContactFullname"]')
const mediaQuery = window.matchMedia('(max-width: 768px)')


function handleTabletChange (e) {
  if (e.matches) {
    contactInputFullname.placeholder = 'ООО «Название организации»'
  }
}


if (contactInputFullname) {
  mediaQuery.addListener(handleTabletChange)
  handleTabletChange(mediaQuery)
}












