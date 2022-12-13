import { Dropzone } from "dropzone"

import { sendData, showInfoModal } from "../_functions"


const genDropzones = document.querySelectorAll('.general-dropzone')


if (genDropzones) {
  genDropzones.forEach(dropzoneEl => {

    const addBtn = dropzoneEl.closest('.general-dropzone-wrapper')?.querySelector('.general-dropzone__add-btn')

    const dataObj = JSON.parse(dropzoneEl.dataset.generalInfo)
    const {url, width, height, type, filesCount, removeUrl} = dataObj

    const newGenDropzone = new Dropzone(dropzoneEl, {
      maxFilesize: 5,
      url: url,
      maxFiles: filesCount,
      acceptedFiles: 'image/png, image/jpeg, image/jpg',
      addRemoveLinks: true,
      thumbnailWidth: width,
      thumbnailHeight: height,
      clickable: '.general-dropzone__add-btn',
      removedfile: async function (file) {
        const data = {
          filetype: type,
          id_person_image: file._removeLink.dataset.id
        }

        const jsonData = JSON.stringify(data)
        const response = await sendData(jsonData, removeUrl)
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse

        if (status === 'ok') {
          if (file.previewElement != null && file.previewElement.parentNode != null) {
            file.previewElement.parentNode.removeChild(file.previewElement)
          }
        } else {
          showInfoModal(errortext)
        }
      }
    })

    newGenDropzone.on("sending", function (file, xhr, formData) {
      formData.append("filetype", type)
      formData.append("id_item", addBtn.dataset.id)
    })

    newGenDropzone.on("error", function (file) {
      showInfoModal('Ошибка 404')
      file.previewElement.parentNode.removeChild(file.previewElement)
    })

    newGenDropzone.on("success", function (file, response) {
      const resObj = JSON.parse(response)
      const {status, errortext, id_person_image} = resObj

      if (status !== 'ok') {
        showInfoModal(errortext)
        file.previewElement.parentNode.removeChild(file.previewElement)
      } else {
        file._removeLink.setAttribute('data-id', id_person_image)
      }
    })

    const existingImages = dropzoneEl.querySelectorAll('.dz-preview')
    if (existingImages) {
      existingImages.forEach(el => {
        const deleteBtn = el.querySelector('.dz-remove')
        deleteBtn.addEventListener('click', async (e) => {
          const data = {
            filetype: type,
            id_person_image: e.target.dataset.id
          }
          const jsonData = JSON.stringify(data)
          const response = await sendData(jsonData, removeUrl)
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
  })
}


