import IMask from 'imask'


const currencyMasks = document.querySelectorAll('.currency-mask')
if (currencyMasks) {
    currencyMasks.forEach(itemMask => {
        const inputMask = IMask(
            itemMask,
            {
                mask: Number,
                min: -1000000000000,
                max:  1000000000000,
                thousandsSeparator: ' '
            }
        )
    })
}

