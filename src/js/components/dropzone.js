
import { Dropzone } from "dropzone";

import { sendData, showInfoModal } from "../_functions";

const passportAmount = document.querySelector('.page-doc__passport-amount')
const passportAddBtn = document.querySelector('#passport-add')
const insuranceAddBtn = document.querySelector('#insurance-add')
const taxAddBtn = document.querySelector('#tax-add')

// Функция обновления количества сканов паспорта

const updateAmountScans = () => {
  const currentAmount = passportScan.querySelectorAll('.dz-preview').length
  passportAmount.textContent = currentAmount.toString()
  if (currentAmount > 15) {
    passportAddBtn.style.display = 'none'
  } else {
    passportAddBtn.style.display = 'block'
  }
}

//Dropzone для аватара на странице информации

const personAvatar = document.querySelector('#person-dropzone');
if (personAvatar) {
  let personDropzone = new Dropzone(personAvatar, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 1,
    acceptedFiles: '.jpeg, .jpg',
    addRemoveLinks: true,
    removedfile: async function (file) {
      const data = {
        filetype: "avatar",
        id_person_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  personDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })

  personDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "avatar");
  });

  personDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_person_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_person_image)
    }
  });

  const existingImages = personAvatar.querySelectorAll('.dz-preview')

  if (existingImages) {
    existingImages.forEach(el => {

      const deleteBtn = el.querySelector('.dz-remove')

      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "avatar",
          id_person_image: e.target.dataset.id
        }

        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}


//Dropzone для сканов паспорта на странице документов

const passportScan = document.querySelector('#passport-dropzone');

if (passportScan) {
  let passportDropzone = new Dropzone(passportScan, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 16,
    thumbnailWidth: 50,
    thumbnailHeight: 50,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    clickable: '#passport-add',
    removedfile: async function (file) {
      const data = {
        filetype: "passport",
        id_person_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
          updateAmountScans()
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });


  passportDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "passport");
  });

  passportDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })


  passportDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_person_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_person_image)
      updateAmountScans()
    }
  });

  const existingImages = passportScan.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {

      const deleteBtn = el.querySelector('.dz-remove')

      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "passport",
          id_person_image: e.target.dataset.id
        }

        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
          updateAmountScans()
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}


//Dropzone для сканов СНИЛС на странице документов

const insuranceScan = document.querySelector('#insurance-dropzone');

if (insuranceScan) {
  let insuranceDropzone = new Dropzone(insuranceScan, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 1,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    clickable: '#insurance-add',
    removedfile: async function (file) {
      const data = {
        filetype: "snils",
        id_person_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
          insuranceAddBtn.style.display = 'block'
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  insuranceDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "snils");
  });

  insuranceDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })

  insuranceDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_person_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_person_image)
      insuranceAddBtn.style.display = 'none'
    }
  });

  const existingImages = insuranceScan.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {
      const deleteBtn = el.querySelector('.dz-remove')
      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "snils",
          id_person_image: e.target.dataset.id
        }

        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
          insuranceAddBtn.style.display = 'block'
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}


//Dropzone для сканов ИНН на странице документов

const taxScan = document.querySelector('#tax-dropzone');

if (taxScan) {
  let taxDropzone = new Dropzone(taxScan, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 1,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    clickable: '#tax-add',
    removedfile: async function (file) {
      const data = {
        filetype: "inn",
        id_person_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
          taxAddBtn.style.display = 'block'
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  taxDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "inn");
  });

  taxDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })

  taxDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_person_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_person_image)
      taxAddBtn.style.display = 'none'
    }
  });

  const existingImages = taxScan.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {
      const deleteBtn = el.querySelector('.dz-remove')
      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "inn",
          id_person_image: e.target.dataset.id
        }

        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          taxAddBtn.style.display = 'block'
          el.parentNode.removeChild(el);
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}


//Dropzone для лого организации на странице новой организации

const newOrgLogo = document.querySelector('#new-organization-dropzone');

if (newOrgLogo) {
  let newOrgDropzone = new Dropzone(newOrgLogo, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 3,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    thumbnailWidth: 170,
    thumbnailHeight: 170,
    clickable: '#logo-add',
    removedfile: async function (file) {
      const data = {
        filetype: "org",
        id_person_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  newOrgDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "org");
  });

  newOrgDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })


  newOrgDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_person_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_person_image)
    }
  });

  const existingImages = newOrgLogo.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {
      const deleteBtn = el.querySelector('.dz-remove')
      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "org",
          id_person_image: e.target.dataset.id
        }
        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}

//Dropzone для лого организации на странице редактирования контакта

const contactLogo = document.querySelector('#contact-dropzone');

if (contactLogo) {
  let contactDropzone = new Dropzone(contactLogo, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 1,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    thumbnailWidth: 170,
    thumbnailHeight: 170,
    clickable: '#logo-add',
    removedfile: async function (file) {
      const data = {
        filetype: "contact-logo",
        id_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  contactDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "contact-logo");
  });

  contactDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })

  contactDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_image)
    }
  });

  const existingImages = contactLogo.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {
      const deleteBtn = el.querySelector('.dz-remove')
      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "contact-logo",
          id_image: e.target.dataset.id
        }
        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }
}

//Dropzone для физ лица на странице редактирования контакта

const physLogo = document.querySelector('#phys-dropzone');

if (physLogo) {
  let physDropzone = new Dropzone(physLogo, {
    maxFilesize: 5,
    url: "/include/ajax/upload_image.php",
    maxFiles: 1,
    acceptedFiles: '.png, .jpeg, .jpg',
    addRemoveLinks: true,
    thumbnailWidth: 170,
    thumbnailHeight: 170,
    clickable: '#phys-add',
    removedfile: async function (file) {
      const data = {
        filetype: "contact-logo",
        id_image: file._removeLink.dataset.id
      }

      const jsonData = JSON.stringify(data)
      const response = await sendData(jsonData, '/include/ajax/delete_image.php')
      const finishedResponse = await response.json()

      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        if (file.previewElement != null && file.previewElement.parentNode != null) {
          file.previewElement.parentNode.removeChild(file.previewElement);
        }
      } else {
        showInfoModal(errortext)
      }
    }
  });

  physDropzone.on("sending", function (file, xhr, formData) {
    formData.append("filetype", "contact-logo");
  });

  physDropzone.on("error", function (file) {
    showInfoModal('Ошибка 404')
    file.previewElement.parentNode.removeChild(file.previewElement);
  })

  physDropzone.on("success", function (file, response) {
    const resObj = JSON.parse(response)
    const {status, errortext, id_image} = resObj

    if (status !== 'ok') {
      showInfoModal(errortext)
      file.previewElement.parentNode.removeChild(file.previewElement);
    } else {
      file._removeLink.setAttribute('data-id', id_image)
    }
  });


  const existingImages = physLogo.querySelectorAll('.dz-preview')
  if (existingImages) {
    existingImages.forEach(el => {
      const deleteBtn = el.querySelector('.dz-remove')
      deleteBtn.addEventListener('click', async (e) => {
        const data = {
          filetype: "contact-logo",
          id_image: e.target.dataset.id
        }
        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, '/include/ajax/delete_image.php')
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          el.parentNode.removeChild(el);
        } else {
          showInfoModal(errortext)
        }
      })
    })
  }

}






