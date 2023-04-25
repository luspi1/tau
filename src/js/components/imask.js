import IMask from 'imask'


const currencyMasks = document.querySelectorAll('.currency-mask')
if (currencyMasks) {
    currencyMasks.forEach(itemMask => {
        const dataMask = itemMask.dataset.mask
        const inputMask = IMask(
            itemMask,
            {
                mask: dataMask,
                blocks: {
                    num: {
                        mask: Number,
                        thousandsSeparator: ' '
                    }
                }
            }
        )
    })


}

