// загрузка файлов

import { sendData, showInfoModal } from '../_functions'

const fileUploads = document.querySelectorAll('.file-upload')

if (fileUploads) {
  const isDelete = (target) => target.classList.contains('file-upload__delete')
  const handleDeleteFile = async (script, fileId, delElement) => {

    const data = {
      id_file: fileId
    }
    const jsonData = JSON.stringify(data)
    try {
      const response = await sendData(jsonData, script)
      const finishedResponse = await response.json()
      const {status, errortext} = finishedResponse

      if (status === 'ok') {
        delElement.closest('.file-upload__el').remove()
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  fileUploads.forEach(fileUploadEl => {

    const uploadInput = fileUploadEl.querySelector('.file-upload__add')
    const uploadWrapper = fileUploadEl.querySelector('.file-upload__wrapper')

    const uploadScript = fileUploadEl.dataset.script
    const deleteScript = fileUploadEl.dataset.deleteScript
    const addData = fileUploadEl.dataset.add

    uploadInput.addEventListener('input', (evt) => {
      let targetInput = evt.currentTarget
      let fileItem = targetInput.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(fileItem)

      reader.addEventListener('load', async (e) => {

        const data = {
          add_data: addData,
          file: e.target.result,
          file_info: {
            name: fileItem.name,
            size: fileItem.size,
            type: fileItem.type,
            lastModified: fileItem.lastModified,
            lastModifiedDate: fileItem.lastModifiedDate
          }
        }
        const jsonData = JSON.stringify(data)

        try {
          const response = await sendData(jsonData, uploadScript)
          const finishedResponse = await response.json()
          const {status, errortext, html} = finishedResponse

          if (status === 'ok') {
            uploadWrapper.insertAdjacentHTML('beforeend', html)
            targetInput.value = ''
          } else {
            showInfoModal(errortext)
          }
        } catch (err) {
          showInfoModal("Во время выполнения запроса произошла ошибка")
          console.error(err)
        }
      })

      reader.addEventListener('error', () => {
        showInfoModal(`Произошла ошибка при чтении файла: ${fileItem.name}`)
      })
    })

    fileUploadEl.addEventListener('click', (e) => {
      if (isDelete(e.target)) {
        const id = e.target.dataset.id
        handleDeleteFile(deleteScript, id, e.target)
      }
    })
  })
}


// доп логика загрузки сканов на странице one-document

const oneDocPage = document.querySelector('.one-document-page')

if (oneDocPage) {


  const paperSection = oneDocPage.querySelector('.contract__paper')
  const filesList = oneDocPage.querySelector('.contract__paper-list')
  const callback = (mutations) => {
    if (mutations[0].target.childElementCount > 0) {
      paperSection.classList.add('_active')
    } else {
      paperSection.classList.remove('_active')
    }
  }


  const observer = new MutationObserver(callback)
  observer.observe(filesList, {
    childList: true,
  })


}














