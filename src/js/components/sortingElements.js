const sortWrappers = document.querySelectorAll('.sort-wrapper')


if (sortWrappers) {


  sortWrappers.forEach(sortWrapper => {

    const sortSelect = sortWrapper.querySelector('.sort-select')
    const sortElementsArr = Array.from(sortWrapper.querySelector('.sort-list').children)

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        let selectValue = e.detail.value

        switch (selectValue) {
          case 'dateNew' :
            sortElementsArr.sort()
        }


      })

    }


  })


}
