let mainRoot = 'beans'
let mainRootHeight = '410px'
let indentSize = '20px'
let policeDropdownToggled = false
let sizeDropdownToggled = false
let textAlignDropdownToggled = false
let indentDropdownToggled = false
let morePoliceDropdownToggled = false
let policeSelected = 'sans-serif'
let sizeSelected = 'small'
let colorSelected = '#000000'
let contentState = []
let contentIndex = 0
let screenWidth
let selection

document.addEventListener('DOMContentLoaded', () => {
    // Content creation functions
    let createPoliceElementForContent = (name, value, policeContent, policeDropdownArrow, selectedContent, callback) => {
        let element = document.createElement('div')
        element.id = value
        element.textContent = name
        element.style.color = '#275C8C'
        element.style.padding = '8px 16px'
        element.style.width = '100%'
        element.style.textAlign = 'center'
        element.style.fontFamily = 'Arial'
        element.style.userSelect = 'none'
        element.style.cursor = 'pointer'

        // Event listeners on each item in the dropdown
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        })
        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })
        element.addEventListener('click', () => {
            selectedContent.textContent = name
            selectedContent.width = '74px'
            policeContent.style.display = 'none'
            policeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
            policeDropdownArrow.style.margin = '6px 0px 0px 10px'
            policeDropdownToggled = false
            if (callback === undefined) {
                return
            }
            policeSelected = value
            callback(value)
        })
        return element
    }

    let createSizeElementForContent = (name, value, sizeContent, sizeDropdownArrow, callback) => {
        let element = document.createElement('div')
        element.id = value
        element.textContent = name
        element.style.color = '#275C8C'
        element.style.padding = '8px 16px'
        element.style.textAlign = 'center'
        element.style.fontFamily = 'Arial'
        element.style.userSelect = 'none'
        element.style.cursor = 'pointer'
        element.style.width = '100%'
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        })
        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })
        element.addEventListener('click', () => {
            sizeContent.style.display = 'none'
            sizeDropdownArrow.style.border = '5px solid transparent'
            sizeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
            sizeDropdownArrow.style.margin = '15px 0px 0px 0px'
            sizeDropdownToggled = false
            if (callback === undefined) {
                return
            }
            sizeSelected = value
            callback(value)
        })
        return element
    }

    let createIndentElementForContent = (name, image, indentContent, indentThumbnailArrow, callback) => {
        let element = document.createElement('div')
        element.appendChild(image)
        element.id = name
        element.style.width = '100%'
        element.style.display = 'flex'
        element.style.flexWrap = 'wrap'
        element.style.justifyContent = 'center'
        element.style.padding = '0 6px'
        element.style.userSelect = 'none'
        element.style.cursor = 'pointer'
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        })
        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })
        element.addEventListener('click', () => {
            indentDropdownToggled = false
            indentContent.style.display = 'none'
            indentThumbnailArrow.style.borderColor = '#275C8C transparent transparent transparent'
            indentThumbnailArrow.style.margin = '15px 0px 0px 0px'
            if (callback === undefined) {
                return
            }
            callback('Toggled')
        })
        return element
    }

    let createTextAlignElementForContent = (name, image, indentContent, indentThumbnailArrow, callback) => {
        let element = document.createElement('div')
        element.appendChild(image)
        element.id = name
        element.style.width = '100%'
        element.style.display = 'flex'
        element.style.flexWrap = 'wrap'
        element.style.justifyContent = 'center'
        element.style.padding = '0 6px'
        element.style.userSelect = 'none'
        element.style.cursor = 'pointer'
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        })
        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })
        element.addEventListener('click', () => {
            indentDropdownToggled = false
            indentContent.style.display = 'none'
            indentThumbnailArrow.style.borderColor = 'black transparent transparent transparent'
            indentThumbnailArrow.style.margin = '15px 0px 0px 0px'
            if (callback === undefined) {
                return
            }
            callback('Toggled')
        })
        return element
    }

    let createPoliceSelection = (callbackPoliceChangeFunction) => {
        // Main structure of the police selection functions
        let policeContainer = document.createElement('div')
        let policeDropdown = document.createElement('div')
        let policeDropdownArrow = document.createElement('div')
        let policeContent = document.createElement('div')

        // Value handling part of the dropdown
        let selectedPoliceContent = document.createElement('p')

        // IDs attributions
        policeContainer.id = 'police-container'
        policeDropdown.id = 'police-dropdown'
        policeDropdownArrow.id = 'police-dropdown-arrow'
        policeContent.id = 'police-content'
        selectedPoliceContent.id = 'selected-police-content'

        // Setting up main architecture of the dropdown
        policeDropdown.appendChild(selectedPoliceContent)
        policeDropdown.appendChild(policeDropdownArrow)

        // Adding content to the dropdown
        policeContent.appendChild(createPoliceElementForContent('Sans Serif', 'Arial, Helvetica, sans-serif', policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))
        policeContent.appendChild(
            createPoliceElementForContent('Serif', '"Palatino Linotype", "Book Antiqua", Palatino, serif', policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction)
        )
        policeContent.appendChild(createPoliceElementForContent('Georgia', 'Georgia, serif', policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))
        policeContent.appendChild(createPoliceElementForContent('Tahoma', 'Tahoma, Geneva, sans-serif', policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))

        // Setting up the police container
        policeContainer.style.display = 'inline-flex'
        policeContainer.style.flexWrap = 'wrap'
        policeContainer.style.flexDirection = 'column'

        // Setting up police dropdown
        policeDropdown.style.backgroundColor = 'white'
        policeDropdown.style.display = 'inline-flex'
        policeDropdown.style.flexOrientation = 'row'
        policeDropdown.style.flexWrap = 'wrap'
        policeDropdown.style.justifyContent = 'space-between'
        policeDropdown.style.alignItems = 'center'
        policeDropdown.style.padding = '8px 16px'
        policeDropdown.style.cursor = 'pointer'
        policeDropdown.style.userSelect = 'none'
        policeDropdown.style.width = '130px'

        let closePoliceDropdown = () => {
            policeDropdownToggled = false
            policeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
            policeDropdownArrow.style.margin = '6px 0px 0px 10px'
            policeContent.style.display = 'none'
        }

        let openPoliceDropdown = () => {
            policeDropdownToggled = true
            policeDropdownArrow.style.borderColor = 'transparent transparent #275C8C transparent'
            policeDropdownArrow.style.margin = '0px 0px 6px 10px'
            policeContent.style.display = 'inline-flex'
        }

        window.openPoliceDropdown = openPoliceDropdown
        window.closePoliceDropdown = closePoliceDropdown

        // Enable toggle functions on the dropdown
        policeDropdown.addEventListener('click', () => {
            policeDropdownToggled = !policeDropdownToggled
            if (policeDropdownToggled) {
                window.openPoliceDropdown()
                return
            }
            window.closePoliceDropdown()
        })

        // Setting up police content
        selectedPoliceContent.style.color = '#275C8C'
        selectedPoliceContent.style.fontFamily = 'Arial'
        selectedPoliceContent.textContent = 'Sans Serif'

        // Setting up police dropdown arrow
        policeDropdownArrow.style.content = ''
        policeDropdownArrow.style.width = '0'
        policeDropdownArrow.style.height = '0'
        policeDropdownArrow.style.border = '5px solid transparent'
        policeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
        policeDropdownArrow.style.margin = '6px 0px 0px 10px'

        // Setting police dropdown content
        policeContent.style.display = 'none'
        policeContent.style.position = 'absolute'
        policeContent.style.marginTop = '34px'
        policeContent.style.padding = '6px 0'
        policeContent.style.borderRadius = '5px'
        policeContent.style.border = '1px solid'
        policeContent.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        policeContent.style.boxShadow = '20px 20px 50px lightgray'
        policeContent.style.flexDirection = 'column'
        policeContent.style.flexWrap = 'wrap'
        policeContent.style.alignItems = 'center'
        policeContent.style.backgroundColor = 'white'

        policeContainer.appendChild(policeDropdown)
        policeContainer.appendChild(policeContent)
        return policeContainer
    }

    let createSizeSelection = (callBackSizeChange) => {
        // Main structure of the size selection functions
        let sizeContainer = document.createElement('div')
        let sizeThumbnail = document.createElement('div')
        let sizeContent = document.createElement('div')

        // Esthetics for the dropdown
        let imageThumbnail = document.createElement('span')
        let sizeDropdownArrow = document.createElement('div')

        // Setting up the IDs
        sizeContainer.id = 'size-container'
        sizeThumbnail.id = 'size-dropdown-thumbnail'
        sizeContent.id = 'size-content'
        sizeDropdownArrow.id = 'size-dropdown-arrow'

        // Setting up the container
        sizeContainer.style.display = 'inline-flex'
        sizeContainer.style.flexDirection = 'column'
        sizeContainer.style.flexWrap = 'wrap'
        sizeContainer.style.userSelect = 'none'

        // Setting up the thumbnail container
        sizeThumbnail.style.display = 'inline-flex'
        sizeThumbnail.style.cursor = 'pointer'
        sizeThumbnail.style.color = '#275C8C'

        let openSizeDropdown = () => {
            sizeDropdownToggled = true
            sizeDropdownArrow.style.borderColor = 'transparent transparent #275C8C transparent'
            sizeDropdownArrow.style.margin = '10px 0px 0px 0px'
            sizeContent.style.display = 'inline-flex'
        }

        let closeSizeDropdown = () => {
            sizeDropdownToggled = false
            sizeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
            sizeDropdownArrow.style.margin = '15px 0px 0px 0px'
            sizeContent.style.display = 'none'
        }

        window.openSizeDropdown = openSizeDropdown
        window.closeSizeDropdown = closeSizeDropdown

        sizeThumbnail.addEventListener('click', () => {
            sizeDropdownToggled = !sizeDropdownToggled
            if (sizeDropdownToggled) {
                window.openSizeDropdown()
                return
            }
            window.closeSizeDropdown()
        })

        // Setting up the thumbnail image
        imageThumbnail.style.padding = '5px'
        imageThumbnail.classList.add('material-icons')
        imageThumbnail.innerHTML = 'format_size'
        imageThumbnail.style.fontSize = '26px'

        // Setting up the dropdown arrow
        sizeDropdownArrow.style.content = ''
        sizeDropdownArrow.style.width = '0'
        sizeDropdownArrow.style.height = '0'
        sizeDropdownArrow.style.border = '5px solid transparent'
        sizeDropdownArrow.style.borderColor = '#275C8C transparent transparent transparent'
        sizeDropdownArrow.style.margin = '15px 0px 0px 0px'

        // Setting up content styles
        sizeContent.style.display = 'none'
        sizeContent.style.position = 'absolute'
        sizeContent.style.marginTop = '36px'
        sizeContent.style.padding = '6px 0'
        sizeContent.style.borderRadius = '5px'
        sizeContent.style.border = '1px solid'
        sizeContent.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        sizeContent.style.boxShadow = '20px 20px 50px lightgray'
        sizeContent.style.flexDirection = 'column'
        sizeContent.style.flexWrap = 'wrap'
        sizeContent.style.alignItems = 'center'
        sizeContent.style.backgroundColor = 'white'

        // Setting up main architecture of the thumbnail
        sizeThumbnail.appendChild(imageThumbnail)
        sizeThumbnail.appendChild(sizeDropdownArrow)

        // Setting up content
        sizeContent.appendChild(createSizeElementForContent('Small', 'small', sizeContent, sizeDropdownArrow, callBackSizeChange))
        sizeContent.appendChild(createSizeElementForContent('Medium', 'medium', sizeContent, sizeDropdownArrow, callBackSizeChange))
        sizeContent.appendChild(createSizeElementForContent('Large', 'large', sizeContent, sizeDropdownArrow, callBackSizeChange))
        sizeContent.appendChild(createSizeElementForContent('X-Large', 'x-large', sizeContent, sizeDropdownArrow, callBackSizeChange))

        // Setting up content of the container
        sizeContainer.appendChild(sizeThumbnail)
        sizeContainer.appendChild(sizeContent)

        return sizeContainer
    }

    let createColorSelection = (callbackColorChange) => {
        // Main structure of the color selection functions
        let colorPickerContainer = document.createElement('div') // color-picker-container
        let colorPickerThumbnail = document.createElement('span') // color-picker-thumbnail
        let colorPickerControl = document.createElement('input') // color-picker-control

        // Setting up IDs of the elements
        colorPickerContainer.id = 'color-picker-container'
        colorPickerThumbnail.id = 'color-picker-thumbnail'
        colorPickerControl.id = 'color-picker-control'

        // Setting up the container
        colorPickerContainer.style.display = 'inline-block'
        colorPickerContainer.style.maxHeight = '36px'
        colorPickerContainer.style.cursor = 'pointer'
        colorPickerContainer.style.userSelect = 'none'

        // Setting up the thumbnail
        colorPickerThumbnail.style.maxHeight = '36px'
        colorPickerThumbnail.style.padding = '3px'
        colorPickerThumbnail.classList.add('material-icons')
        colorPickerThumbnail.innerHTML = 'text_format'
        colorPickerThumbnail.style.fontSize = '30px'
        colorPickerThumbnail.style.color = '#275C8C'
        colorPickerThumbnail.addEventListener('click', () => {
            colorPickerControl.click()
        })

        // Setting up the color picker
        colorPickerControl.type = 'color'
        colorPickerControl.style.display = 'none'
        colorPickerControl.addEventListener('change', (event) => {
            if (callbackColorChange === undefined) {
                return
            }
            colorSelected = event.target.value
            callbackColorChange(event.target.value)
        })
        colorPickerContainer.appendChild(colorPickerThumbnail)
        colorPickerContainer.appendChild(colorPickerControl)
        return colorPickerContainer
    }

    let createBoldSelection = (callbackBoldChange) => {
        let boldContainer = document.createElement('div')
        let boldThumbnail = document.createElement('span')

        // Setting up IDs
        boldContainer.id = 'bold-container'

        // Setting up container
        boldContainer.style.maxHeight = '36px'
        boldContainer.style.cursor = 'pointer'
        boldContainer.style.userSelect = 'none'
        boldContainer.addEventListener('mousedown', () => {
            boldContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackBoldChange === undefined) {
                return
            }
            callbackBoldChange('Toggled')
        })
        boldContainer.addEventListener('mouseup', () => {
            boldContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        // Setting up image thumbnail
        boldThumbnail.classList.add('material-icons')
        boldThumbnail.innerHTML = 'format_bold'
        boldThumbnail.style.fontSize = '30px'
        boldThumbnail.style.padding = '3px'
        boldThumbnail.style.maxHeight = '36px'
        boldThumbnail.style.color = '#275C8C'

        // Adding the thumbnail to the container
        boldContainer.appendChild(boldThumbnail)
        return boldContainer
    }

    let createItalicSelection = (callbackItalicChange) => {
        let italicContainer = document.createElement('div')
        let italicThumbnail = document.createElement('span')

        // Setting up IDs
        italicContainer.id = 'italic-container'

        // Setting up container
        italicContainer.style.maxHeight = '36px'
        italicContainer.style.cursor = 'pointer'
        italicContainer.style.userSelect = 'none'
        italicContainer.addEventListener('mousedown', () => {
            italicContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackItalicChange === undefined) {
                return
            }
            callbackItalicChange('Toggled')
        })
        italicContainer.addEventListener('mouseup', () => {
            italicContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        // Setting up image thumbnail
        italicThumbnail.classList.add('material-icons')
        italicThumbnail.innerHTML = 'format_italic'
        italicThumbnail.style.fontSize = '30px'
        italicThumbnail.style.padding = '3px'
        italicThumbnail.style.maxHeight = '36px'
        italicThumbnail.style.color = '#275C8C'

        // Adding the thumbnail to the container
        italicContainer.appendChild(italicThumbnail)
        return italicContainer
    }

    let createUnderlineSelection = (callbackUnderlineChange) => {
        let underlineContainer = document.createElement('div')
        let underlineThumbnail = document.createElement('span')

        // Setting up IDs
        underlineContainer.id = 'italic-container'

        // Setting up container
        underlineContainer.style.maxHeight = '36px'
        underlineContainer.style.cursor = 'pointer'
        underlineContainer.style.userSelect = 'none'
        underlineContainer.addEventListener('mousedown', () => {
            underlineContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            callbackUnderlineChange('Toggled')
        })

        underlineContainer.addEventListener('mouseup', () => {
            underlineContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        // Setting up image thumbnail
        underlineThumbnail.classList.add('material-icons')
        underlineThumbnail.innerHTML = 'format_underlined'
        underlineThumbnail.style.fontSize = '26px'
        underlineThumbnail.style.padding = '5px'
        underlineThumbnail.style.maxHeight = '36px'
        underlineThumbnail.style.color = '#275C8C'

        // Adding the thumbnail to the container
        underlineContainer.appendChild(underlineThumbnail)
        return underlineContainer
    }

    let createOrderedListSelection = (callbackOrderedListToggle) => {
        let orderedListContainer = document.createElement('div')
        let orderedListThumbnail = document.createElement('span')

        // Setting up IDs
        orderedListContainer.id = 'italic-container'

        // Setting up container
        orderedListContainer.style.maxHeight = '36px'
        orderedListContainer.style.cursor = 'pointer'
        orderedListContainer.style.userSelect = 'none'
        orderedListContainer.addEventListener('mousedown', () => {
            orderedListContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackOrderedListToggle === undefined) {
                return
            }
            callbackOrderedListToggle('Toggled')
        })

        orderedListContainer.addEventListener('mouseup', () => {
            orderedListContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        // Setting up image thumbnail
        orderedListThumbnail.classList.add('material-icons')
        orderedListThumbnail.innerHTML = 'format_list_bulleted'
        orderedListThumbnail.style.fontSize = '30px'
        orderedListThumbnail.style.padding = '3px'
        orderedListThumbnail.style.maxHeight = '36px'
        orderedListThumbnail.style.color = '#275C8C'

        // Adding the thumbnail to the container
        orderedListContainer.appendChild(orderedListThumbnail)
        return orderedListContainer
    }

    let createNumberedListSelection = (callbackNumberedListToggle) => {
        let numberedListContainer = document.createElement('div')
        let numberedListThumbnail = document.createElement('span')

        // Setting up IDs
        numberedListContainer.id = 'italic-container'

        // Setting up container
        numberedListContainer.style.maxHeight = '36px'
        numberedListContainer.style.cursor = 'pointer'
        numberedListContainer.style.userSelect = 'none'
        numberedListContainer.addEventListener('mousedown', () => {
            numberedListContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackNumberedListToggle === undefined) {
                return
            }
            callbackNumberedListToggle('Toggled')
        })

        numberedListContainer.addEventListener('mouseup', () => {
            numberedListContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        // Setting up image thumbnail
        numberedListThumbnail.classList.add('material-icons')
        numberedListThumbnail.innerHTML = 'format_list_numbered'
        numberedListThumbnail.style.fontSize = '30px'
        numberedListThumbnail.style.padding = '3px'
        numberedListThumbnail.style.maxHeight = '36px'
        numberedListThumbnail.style.color = '#275C8C'

        // Adding the thumbnail to the container
        numberedListContainer.appendChild(numberedListThumbnail)
        return numberedListContainer
    }

    let createIndentSelection = (callbackAddIndentChange, callbackRemoveIndentChange) => {
        let indentContainer = document.createElement('div')
        let indentThumbnailContainer = document.createElement('div')
        let indentThumbnailArrow = document.createElement('div')
        let indentContent = document.createElement('div')

        // Creating the thumbnails for the functions
        let indentRightThumbnail = document.createElement('span')
        let indentLeftThumbnail = document.createElement('span')

        // Setting up the IDs
        indentContainer.id = 'indent-container'
        indentThumbnailContainer.id = 'indent-thumbnail-container'
        indentContent.id = 'indent-content'

        // Setting up the indent right thumbnail image
        indentRightThumbnail.classList.add('material-icons')
        indentRightThumbnail.innerHTML = 'format_indent_increase'
        indentRightThumbnail.style.fontSize = '26px'
        indentRightThumbnail.style.padding = '5px'
        indentRightThumbnail.style.maxHeight = '36px'
        indentRightThumbnail.style.color = '#275C8C'
        indentLeftThumbnail.classList.add('material-icons')
        indentLeftThumbnail.innerHTML = 'format_indent_decrease'
        indentLeftThumbnail.style.fontSize = '26px'
        indentLeftThumbnail.style.padding = '5px'
        indentLeftThumbnail.style.maxHeight = '36px'
        indentLeftThumbnail.style.color = '#275C8C'

        // Setting up the indent left thumbnail image
        indentContainer.style.display = 'inline-flex'
        indentContainer.style.flexDirection = 'column'
        indentContainer.style.flexWrap = 'wrap'
        indentContainer.style.maxHeight = '36px'
        indentContainer.style.userSelect = 'none'

        // Setting up the thumbnail container
        indentThumbnailContainer.style.display = 'inline-flex'
        indentThumbnailContainer.style.width = '58px'
        indentThumbnailContainer.style.maxHeight = '36px'
        indentThumbnailContainer.style.flexWrap = 'wrap'
        indentThumbnailContainer.style.flexDirection = 'row'
        indentThumbnailContainer.style.cursor = 'pointer'
        indentThumbnailContainer.style.border = '1px solid transparent'
        indentThumbnailContainer.style.borderColor = 'transparent transparent'

        let openIndentDropdown = () => {
            indentDropdownToggled = true
            indentContent.style.display = 'inline-flex'
            indentThumbnailArrow.style.borderColor = 'transparent transparent #275C8C transparent'
            indentThumbnailArrow.style.margin = '10px 0px 0px 0px'
        }

        let closeIndentDropdown = () => {
            indentDropdownToggled = false
            indentContent.style.display = 'none'
            indentThumbnailArrow.style.borderColor = '#275C8C transparent transparent transparent'
            indentThumbnailArrow.style.margin = '15px 0px 0px 0px'
        }

        window.openIndentDropdown = openIndentDropdown
        window.closeIndentDropdown = closeIndentDropdown

        indentThumbnailContainer.addEventListener('click', () => {
            indentDropdownToggled = !indentDropdownToggled
            if (indentDropdownToggled) {
                window.openIndentDropdown()
                return
            }
            window.closeIndentDropdown()
        })

        // Setting up the thumbnail arrow
        indentThumbnailArrow.style.content = ''
        indentThumbnailArrow.style.width = '0'
        indentThumbnailArrow.style.height = '0'
        indentThumbnailArrow.style.border = '5px solid transparent'
        indentThumbnailArrow.style.borderColor = '#275C8C transparent transparent transparent'
        indentThumbnailArrow.style.margin = '15px 0px 0px 0px'

        // Setting up the content arrow
        indentContent.style.backgroundColor = 'white'
        indentContent.style.position = 'absolute'
        indentContent.style.marginTop = '36px'
        indentContent.style.width = '58px'
        indentContent.style.display = 'none'
        indentContent.style.padding = '6px 0'
        indentContent.style.borderRadius = '5px'
        indentContent.style.border = '1px solid'
        indentContent.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        indentContent.style.boxShadow = '20px 20px 50px lightgray'
        indentContent.style.flexWrap = 'wrap'
        indentContent.style.flexDirection = 'column'
        indentContent.style.alignItems = 'center'

        // Adding the content to the thumbnail container
        indentThumbnailContainer.appendChild(indentRightThumbnail.cloneNode(true))
        indentThumbnailContainer.appendChild(indentThumbnailArrow)

        // Adding the options the the content of the dropdown
        indentContent.appendChild(createIndentElementForContent('indent-right-container', indentRightThumbnail.cloneNode(true), indentContent, indentThumbnailArrow, callbackAddIndentChange))
        indentContent.appendChild(createIndentElementForContent('indent-left-container', indentLeftThumbnail.cloneNode(true), indentContent, indentThumbnailArrow, callbackRemoveIndentChange))

        // Creating the main structure of the functionnality
        indentContainer.appendChild(indentThumbnailContainer)
        indentContainer.appendChild(indentContent)

        return indentContainer
    }

    let createTextAlignementSelection = (callbackTextAlignLeftChange, callbackTextAlignCenterChange, callbackTextAlignRightChange) => {
        let textAlignContainer = document.createElement('div')
        let textAlignThumbnailContainer = document.createElement('div')
        let textAlignThumbnailArrow = document.createElement('div')
        let textAlignContent = document.createElement('div')

        // Creating the thumbnails for the functions
        let textAlignLeftThumbnail = document.createElement('span')
        let textAlignCenterThumbnail = document.createElement('span')
        let textAlignRightThumbnail = document.createElement('span')

        // Setting up the IDs
        textAlignContainer.id = 'text-align-container'
        textAlignThumbnailContainer.id = 'text-align-thumbnail-container'
        textAlignContent.id = 'text-align-content'

        // Setting up the indent right thumbnail image
        textAlignLeftThumbnail.classList.add('material-icons')
        textAlignLeftThumbnail.innerHTML = 'format_align_left'
        textAlignLeftThumbnail.style.fontSize = '26px'
        textAlignLeftThumbnail.style.padding = '5px'
        textAlignLeftThumbnail.style.maxHeight = '36px'
        textAlignLeftThumbnail.style.color = '#275C8C'
        textAlignCenterThumbnail.classList.add('material-icons')
        textAlignCenterThumbnail.innerHTML = 'format_align_center'
        textAlignCenterThumbnail.style.fontSize = '26px'
        textAlignCenterThumbnail.style.padding = '5px'
        textAlignCenterThumbnail.style.maxHeight = '36px'
        textAlignCenterThumbnail.style.color = '#275C8C'
        textAlignRightThumbnail.classList.add('material-icons')
        textAlignRightThumbnail.innerHTML = 'format_align_right'
        textAlignRightThumbnail.style.fontSize = '26px'
        textAlignRightThumbnail.style.padding = '5px'
        textAlignRightThumbnail.style.maxHeight = '36px'
        textAlignRightThumbnail.style.color = '#275C8C'

        // Setting up the indent left thumbnail image
        textAlignContainer.style.display = 'inline-flex'
        textAlignContainer.style.flexDirection = 'column'
        textAlignContainer.style.flexWrap = 'wrap'
        textAlignContainer.style.maxHeight = '36px'
        textAlignContainer.style.userSelect = 'none'

        // Setting up the thumbnail container
        textAlignThumbnailContainer.style.display = 'inline-flex'
        textAlignThumbnailContainer.style.width = '58px'
        textAlignThumbnailContainer.style.maxHeight = '36px'
        textAlignThumbnailContainer.style.flexWrap = 'wrap'
        textAlignThumbnailContainer.style.flexDirection = 'row'
        textAlignThumbnailContainer.style.cursor = 'pointer'
        textAlignThumbnailContainer.style.border = '1px solid transparent'
        textAlignThumbnailContainer.style.borderColor = 'transparent transparent'

        let openTextAlignDropdown = () => {
            textAlignDropdownToggled = true
            textAlignContent.style.display = 'inline-flex'
            textAlignThumbnailArrow.style.borderColor = 'transparent transparent #275C8C transparent'
            textAlignThumbnailArrow.style.margin = '10px 0px 0px 0px'
        }

        let closeTextAlignDropdown = () => {
            textAlignDropdownToggled = false
            textAlignContent.style.display = 'none'
            textAlignThumbnailArrow.style.borderColor = '#275C8C transparent transparent transparent'
            textAlignThumbnailArrow.style.margin = '15px 0px 0px 0px'
        }

        window.openTextAlignDropdown = openTextAlignDropdown
        window.closeTextAlignDropdown = closeTextAlignDropdown

        textAlignThumbnailContainer.addEventListener('click', () => {
            textAlignDropdownToggled = !textAlignDropdownToggled
            if (textAlignDropdownToggled) {
                window.openTextAlignDropdown()
                return
            }
            window.closeTextAlignDropdown()
        })

        // Setting up the thumbnail arrow
        textAlignThumbnailArrow.style.content = ''
        textAlignThumbnailArrow.style.width = '0'
        textAlignThumbnailArrow.style.height = '0'
        textAlignThumbnailArrow.style.border = '5px solid transparent'
        textAlignThumbnailArrow.style.borderColor = '#275C8C transparent transparent transparent'
        textAlignThumbnailArrow.style.margin = '15px 0px 0px 0px'

        // Setting up the content arrow
        textAlignContent.style.backgroundColor = 'white'
        textAlignContent.style.position = 'absolute'
        textAlignContent.style.marginTop = '36px'
        textAlignContent.style.width = '58px'
        textAlignContent.style.display = 'none'
        textAlignContent.style.padding = '6px 0'
        textAlignContent.style.borderRadius = '5px'
        textAlignContent.style.border = '1px solid'
        textAlignContent.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        textAlignContent.style.boxShadow = '20px 20px 50px lightgray'
        textAlignContent.style.flexWrap = 'wrap'
        textAlignContent.style.flexDirection = 'column'
        textAlignContent.style.alignItems = 'center'

        // Adding the content to the thumbnail container
        textAlignThumbnailContainer.appendChild(textAlignLeftThumbnail.cloneNode(true))
        textAlignThumbnailContainer.appendChild(textAlignThumbnailArrow)

        // Adding the options the the content of the dropdown
        textAlignContent.appendChild(
            createTextAlignElementForContent('text-align-left-container', textAlignLeftThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignLeftChange)
        )
        textAlignContent.appendChild(
            createTextAlignElementForContent('text-align-center-container', textAlignCenterThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignCenterChange)
        )
        textAlignContent.appendChild(
            createTextAlignElementForContent('text-align-right-container', textAlignRightThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignRightChange)
        )

        // Creating the main structure of the functionnality
        textAlignContainer.appendChild(textAlignThumbnailContainer)
        textAlignContainer.appendChild(textAlignContent)

        return textAlignContainer
    }

    let createImageSelection = (callbackImageSelected) => {
        let imageSelectionContainer = document.createElement('div')
        let imageSelectionThumbnail = document.createElement('span')
        let imageSelectionInput = document.createElement('input')

        imageSelectionContainer.id = 'image-selection-container'

        imageSelectionContainer.style.maxHeight = '36px'
        imageSelectionContainer.style.cursor = 'pointer'
        imageSelectionContainer.style.userSelect = 'none'
        imageSelectionContainer.addEventListener('click', () => {
            imageSelectionInput.click()
        })

        imageSelectionThumbnail.classList.add('material-icons')
        imageSelectionThumbnail.innerHTML = 'insert_photo'
        imageSelectionThumbnail.style.fontSize = '26px'
        imageSelectionThumbnail.style.padding = '5px'
        imageSelectionThumbnail.style.maxHeight = '36px'
        imageSelectionThumbnail.style.color = '#275C8C'

        imageSelectionInput.style.display = 'none'
        imageSelectionInput.type = 'file'
        imageSelectionInput.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0] && event.target.files[0].type && event.target.files[0].type.includes('image')) {
                let reader = new FileReader()
                reader.onload = (file) => {
                    if (callbackImageSelected === undefined) {
                        return
                    }
                    callbackImageSelected(file.target.result)
                }
                reader.readAsDataURL(event.target.files[0])
            }
        })

        imageSelectionContainer.appendChild(imageSelectionThumbnail)
        imageSelectionContainer.appendChild(imageSelectionInput)

        return imageSelectionContainer
    }

    let createUndoSelection = (callbackUndoChange) => {
        let undoSelectionContainer = document.createElement('div')
        let undoSelectionThumbnail = document.createElement('span')

        undoSelectionContainer.id = 'image-selection-container'

        undoSelectionContainer.style.maxHeight = '36px'
        undoSelectionContainer.style.cursor = 'pointer'
        undoSelectionContainer.style.userSelect = 'none'
        undoSelectionContainer.addEventListener('mousedown', () => {
            undoSelectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackUndoChange === undefined) {
                return
            }
            callbackUndoChange('Toggled')
        })

        undoSelectionContainer.addEventListener('mouseup', () => {
            undoSelectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        undoSelectionThumbnail.classList.add('material-icons')
        undoSelectionThumbnail.innerHTML = 'undo'
        undoSelectionThumbnail.style.fontSize = '30px'
        undoSelectionThumbnail.style.padding = '3px'
        undoSelectionThumbnail.style.maxHeight = '36px'
        undoSelectionThumbnail.style.color = '#275C8C'

        undoSelectionContainer.appendChild(undoSelectionThumbnail)

        return undoSelectionContainer
    }

    let createRedoSelection = (callbackRedoChange) => {
        let redoSelectionContainer = document.createElement('div')
        let redoSelectionThumbnail = document.createElement('span')

        redoSelectionContainer.id = 'image-selection-container'

        redoSelectionContainer.style.maxHeight = '36px'
        redoSelectionContainer.style.cursor = 'pointer'
        redoSelectionContainer.style.userSelect = 'none'
        redoSelectionContainer.addEventListener('mousedown', () => {
            redoSelectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            if (callbackRedoChange === undefined) {
                return
            }
            callbackRedoChange('Toggled')
        })

        redoSelectionContainer.addEventListener('mouseup', () => {
            redoSelectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        })

        redoSelectionThumbnail.classList.add('material-icons')
        redoSelectionThumbnail.innerHTML = 'redo'
        redoSelectionThumbnail.style.fontSize = '30px'
        redoSelectionThumbnail.style.padding = '3px'
        redoSelectionThumbnail.style.maxHeight = '36px'
        redoSelectionThumbnail.style.color = '#275C8C'

        redoSelectionContainer.appendChild(redoSelectionThumbnail)

        return redoSelectionContainer
    }

    // Selection within content function
    let getSelection = (cannotBeNull = false) => {
        let selection = window.getSelection()
        if (selection.anchorNode === undefined || selection.anchorNode === null) {
            return { SelectedElements: [] }
        }
        let range = selection.getRangeAt(0)
        let allWithinRangeParent
        if (!range.commonAncestorContainer.getElementsByTagName) {
            allWithinRangeParent = []
            allWithinRangeParent.push(selection.anchorNode.parentElement)
        } else {
            allWithinRangeParent = range.commonAncestorContainer.getElementsByTagName('*')
        }
        let firstElementIndex
        let lastElementIndex
        let selectedElements = []
        let images = []
        let containers = []
        for (let i = 0, el; (el = allWithinRangeParent[i]); i++) {
            if (selection.containsNode(el, true) && (el.tagName === 'P' || el.tagName === 'LI')) {
                selectedElements.push(el)
                continue
            }
            if (selection.containsNode(el, true) && el.tagName === 'DIV') {
                containers.push(el)
                continue
            }
            if (selection.containsNode(el, true) && el.tagName === 'IMG') {
                containers.push(el)
                continue
            }
        }
        if (selectedElements.length <= 0 && containers.length > 0) {
            return { SelectedElements: containers }
        } else if (selectedElements.length <= 0 && images.length > 0) {
            let imagesContainers = images.map((image) => {
                return image.parentElement
            })
            return { SelectedElements: imagesContainers }
        }
        if (selection.anchorNode.parentElement === selectedElements[0]) {
            firstElementIndex = selection.anchorOffset
            lastElementIndex = selection.focusOffset
        } else {
            firstElementIndex = selection.focusOffset
            lastElementIndex = selection.anchorOffset
        }
        if (selectedElements.length === 1) {
            if (firstElementIndex === lastElementIndex) {
                return { SelectedElements: selectedElements }
            }
            if (lastElementIndex < firstElementIndex) {
                let reworkedFirstElement = lastElementIndex
                let reworkedLastElement = firstElementIndex
                firstElementIndex = reworkedFirstElement
                lastElementIndex = reworkedLastElement
            }
            let firstPortionToTrim = selectedElements[0].textContent.substring(0, firstElementIndex)
            let lastPortionToTrim = selectedElements[0].textContent.substring(lastElementIndex, selectedElements[0].textContent.length)
            let selectedText = selectedElements[0].textContent.substring(firstElementIndex, lastElementIndex)
            if (firstPortionToTrim !== undefined && firstPortionToTrim.length > 0) {
                let newElement = selectedElements[0].cloneNode(true)
                newElement.textContent = firstPortionToTrim.split(' ').join('')
                newElement.innerHTML = firstPortionToTrim.split(' ').join('&nbsp;')
                selectedElements[0].parentElement.insertBefore(newElement, selectedElements[0])
            }
            if (lastPortionToTrim !== undefined && lastPortionToTrim.length > 0) {
                let newElement = selectedElements[0].cloneNode(true)
                newElement.textContent = lastPortionToTrim.split(' ').join('')
                newElement.innerHTML = lastPortionToTrim.split(' ').join('&nbsp;')
                if (selectedElements[0].nextSibling !== undefined && selectedElements[0].nextSibling !== null) {
                    selectedElements[0].parentElement.insertBefore(newElement, selectedElements[0].nextSibling)
                } else {
                    selectedElements[0].parentElement.appendChild(newElement)
                }
            }
            selectedElements[0].textContent = selectedText.split(' ').join('')
            selectedElements[0].innerHTML = selectedText.split(' ').join('&nbsp;')
            return { SelectedElements: selectedElements }
        } else if (selectedElements.length === 0) {
            if (!cannotBeNull) {
                return { SelectedElements: [] }
            }
            if (selection.anchorNode.tagName === 'BR') {
                return { SelectedElements: [selection.anchorNode.parentElement] }
            }
            return { SelectedElements: [selection.anchorNode] }
        }
        let firstPortionToTrim = selectedElements[0].textContent.substring(0, firstElementIndex)
        let lastPortionToTrim = selectedElements[selectedElements.length - 1].textContent.substring(lastElementIndex, selectedElements[selectedElements.length - 1].textContent.length)
        let firstSelectedText = selectedElements[0].textContent.substring(firstElementIndex, selectedElements[0].length)
        let lastSelectedText = selectedElements[selectedElements.length - 1].textContent.substring(0, lastElementIndex)
        if (firstPortionToTrim !== undefined && firstPortionToTrim.length > 0) {
            let newElement = selectedElements[0].cloneNode(true)
            newElement.contentEditable = 'true'
            newElement.textContent = firstPortionToTrim
            selectedElements[0].parentElement.insertBefore(newElement, selectedElements[0])
        }
        if (lastPortionToTrim !== undefined && lastPortionToTrim.length > 0) {
            let newElement = selectedElements[selectedElements.length - 1].cloneNode(true)
            newElement.textContent = lastPortionToTrim
            newElement.contentEditable = 'true'
            if (selectedElements[selectedElements.length - 1].nextSibling !== undefined && selectedElements[selectedElements.length - 1].nextSibling !== null) {
                selectedElements[selectedElements.length - 1].parentElement.insertBefore(newElement, selectedElements[selectedElements.length - 1].nextSibling)
            } else {
                selectedElements[selectedElements.length - 1].parentElement.appendChild(newElement)
            }
        }
        selectedElements[0].textContent = firstSelectedText
        selectedElements[selectedElements.length - 1].textContent = lastSelectedText
        return { SelectedElements: selectedElements }
    }

    let addContentState = () => {
        let content = document.querySelector('#html-content-editor')
        if (contentIndex === undefined || contentIndex === contentState.length - 1) {
            contentState.push(content.cloneNode(true))
        } else {
            let newContentState = contentState.filter((content, index) => {
                return index <= contentIndex
            })
            newContentState.push(content.cloneNode(true))
            contentState = newContentState
        }
        contentIndex = contentState.length - 1
    }

    let goBackInContentState = () => {
        let content = document.querySelector('#html-content-editor')
        if (contentIndex > 0) {
            while (content.firstChild) {
                content.removeChild(content.lastChild)
            }
            for (let i = 0; i < contentState[contentIndex - 1].children.length; i++) {
                content.appendChild(contentState[contentIndex - 1].children[i].cloneNode(true))
            }
            contentIndex = contentIndex - 1
        }
    }

    let rollbackInContentState = () => {
        let content = document.querySelector('#html-content-editor')
        if (contentIndex < contentState.length - 1) {
            while (content.firstChild) {
                content.removeChild(content.lastChild)
            }
            for (let i = 0; i < contentState[contentIndex + 1].children.length; i++) {
                content.appendChild(contentState[contentIndex + 1].children[i].cloneNode(true))
            }
            contentIndex = contentIndex + 1
        }
    }

    let placeCaretAtEnd = (content) => {
        if (content === undefined) {
            return
        }
        content.focus()
        if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
            let range = document.createRange()
            range.selectNodeContents(content)
            range.collapse(false)
            let sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        } else if (typeof document.body.createTextRange != 'undefined') {
            let textRange = document.body.createTextRange()
            textRange.moveToElementText(content)
            textRange.collapse(false)
            textRange.select()
        }
    }

    let truncateSelection = () => {
        if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
            return
        }
        if (!selection.HasSelection) {
            let loneElement = selection.ActiveElements[0]
            if (loneElement.tagName === 'P') {
                loneElement = loneElement.lastChild
                let textContent = loneElement.textContent
                let newElement = document.createElement('somum-custom-style')
                newElement.innerHTML = textContent.split(' ').join('&nbsp;')
                loneElement.textContent = ''
                loneElement.innerHTML = ''
                loneElement.appendChild(newElement)
                return [newElement]
            } else if (loneElement.tagName === 'SOMUM-CUSTOM-STYLE') {
                return [loneElement]
            }
        }
        if (selection.ActiveElements.length === 1) {
            let element = selection.ActiveElements[0]
            let firstTextElement
            let selectedTextElement
            let lastTextElement
            if (element.textContent === undefined || element.textContent === null || element.textContent.length <= 0) {
                return undefined
            }
            if (selection.StartOffset > 0) {
                firstTextElement = element.textContent.substring(0, selection.StartOffset)
            }
            if (selection.EndOffset < element.textContent.length - 1) {
                lastTextElement = element.textContent.substring(selection.EndOffset, element.textContent.length)
            }
            selectedTextElement = element.textContent.substring(selection.StartOffset, selection.EndOffset)
            if (selectedTextElement !== undefined && selectedTextElement.length > 0) {
                let selectedElement = document.createElement('somum-custom-style')
                if (element.tagName === 'P') {
                    return undefined
                } else if (element.tagName === 'SOMUM-CUSTOM-STYLE') {
                    selectedElement = element
                    selectedElement.textContent = selectedTextElement
                    selectedElement.innerHTML = selectedTextElement.split(' ').join('&nbsp;')
                    if (firstTextElement !== undefined && firstTextElement.length > 0) {
                        let firstElement = selectedElement.cloneNode(true)
                        firstElement.textContent = firstTextElement
                        firstElement.innerHTML = firstTextElement.split(' ').join('&nbsp;')
                        selectedElement.parentElement.insertBefore(firstElement, selectedElement)
                    }
                    if (lastTextElement !== undefined && lastTextElement.length > 0) {
                        let lastElement = selectedElement.cloneNode(true)
                        lastElement.textContent = lastTextElement
                        lastElement.innerHTML = lastTextElement.split(' ').join('&nbsp;')
                        if (selectedElement.nextSibling !== undefined && selectedElement.nextSibling !== null) {
                            selectedElement.parentElement.insertBefore(lastElement, selectedElement.nextSibling)
                        } else {
                            selectedElement.parentElement.appendChild(lastElement)
                        }
                    }
                }
                return [selectedElement]
            } else {
                return undefined
            }
        } else if (selection.ActiveElements.length > 1) {
            let firstElement = selection.ActiveElements[0]
            let lastElement = selection.ActiveElements[selection.ActiveElements.length - 1]
            let firstSelectedText = firstElement.textContent.substring(selection.StartOffset, firstElement.textContent.length)
            let lastSelectedText = lastElement.textContent.substring(0, selection.EndOffset)
            if (firstSelectedText === undefined || firstSelectedText.length <= 0 || lastSelectedText === undefined || lastSelectedText.length <= 0) {
                return undefined
            }
            if (selection.StartOffset > 0 && firstElement.textContent.length > 0) {
                let notSelectedText = firstElement.textContent.substring(0, selection.StartOffset)
                let notSelectedElement = firstElement.cloneNode(true)
                notSelectedElement.textContent = notSelectedText
                notSelectedElement.innerHTML = notSelectedText.split(' ').join('&nbsp;')
                firstElement.parentElement.insertBefore(notSelectedElement, firstElement)
            }
            if (selection.EndOffset < lastElement.textContent.length - 1 && lastElement.textContent.length > 0) {
                let notSelectedText = lastElement.textContent.substring(selection.EndOffset, lastElement.textContent.length)
                let notSelectedElement = lastElement.cloneNode(true)
                notSelectedElement.textContent = notSelectedText
                notSelectedElement.innerHTML = notSelectedText.split(' ').join('&nbsp;')
                if (lastElement.nextSibling !== undefined && lastElement.nextSibling !== null) {
                    lastElement.parentElement.insertBefore(notSelectedElement, lastElement.nextSibling)
                } else {
                    lastElement.parentElement.appendChild(notSelectedElement)
                }
            }
            firstElement.textContent = firstSelectedText
            firstElement.innerHTML = firstSelectedText.split(' ').join('&nbsp;')

            lastElement.textContent = lastSelectedText
            lastElement.innerHTML = lastSelectedText.split(' ').join('&nbsp;')
            return selection.ActiveElements
        }
    }

    // Callback functions
    let policeChangeCallback = (police) => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            element.style.fontFamily = police
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeSizeChangeCallback = (size) => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            element.style.fontSize = size
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeColorChangeCallback = (color) => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            element.style.color = color
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeBoldToggleCallback = () => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            if (element.style.fontWeight === 'bold') {
                element.style.fontWeight = 'normal'
                return
            }
            element.style.fontWeight = 'bold'
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeItalicToggleCallback = () => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            if (element.style.fontStyle === 'italic') {
                element.style.fontStyle = 'normal'
                return
            }
            element.style.fontStyle = 'italic'
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeUnderlineToggleCallback = () => {
        let elementsToChange = truncateSelection()
        if (elementsToChange === undefined || elementsToChange.length <= 0) {
            return
        }
        elementsToChange.forEach(element => {
            if (element.style.textDecoration === 'underline') {
                element.style.textDecoration = 'none'
                return
            }
            element.style.textDecoration = 'underline'
        })
        placeCaretAtEnd(elementsToChange.pop())
        addContentState()
    }

    let policeTextAlignementLeftCallback = () => {
        let selection = getSelection()
        selection.SelectedElements.forEach((element) => {
            let container = element.parentElement
            container.style.justifyContent = 'flex-start'
            element.style.textAlign = 'left'
            if (container.tagName === 'OL' || container.tagName === 'UL') {
                container.children.forEach((child) => {
                    child.style.textAlign = 'left'
                })
                container.style.paddingLeft = '40px'
                container.style.alignItems = 'flex-start'
                container.style.justifyContent = 'center'
            }
        })
        placeCaretAtEnd(selection.SelectedElements.pop())
        addContentState()
    }

    let policeTextAlignementCenterCallback = () => {
        let selection = getSelection()
        selection.SelectedElements.forEach((element) => {
            let container = element.parentElement
            container.style.justifyContent = 'center'
            container.style.padding = '0'
            element.style.textAlign = 'center'
            element.style.padding = '0'
            if (container.tagName === 'OL' || container.tagName === 'UL') {
                container.children.forEach((child) => {
                    child.style.textAlign = 'center'
                })
                container.style.alignItems = 'center'
                container.style.justifyContent = 'center'
            }
        })
        placeCaretAtEnd(selection.SelectedElements.pop())
        addContentState()
    }

    let policeTextAlignementRightCallback = () => {
        let selection = getSelection()
        selection.SelectedElements.forEach((element) => {
            let container = element.parentElement
            container.style.justifyContent = 'flex-end'
            container.style.padding = '0'
            element.style.textAlign = 'right'
            element.style.padding = '0'
            if (container.tagName === 'OL' || container.tagName === 'UL') {
                container.children.forEach((child) => {
                    child.style.textAlign = 'right'
                })
                container.style.alignItems = 'flex-end'
                container.style.justifyContent = 'center'
            }
        })
        placeCaretAtEnd(selection.SelectedElements.pop())
        addContentState()
    }

    let policeAddIndentCallback = () => {
        let selection = getSelection(true)
        let sizeIndent = parseInt(indentSize.replace('px', ''))
        selection.SelectedElements.forEach((element) => {
            let currentIndent = element.style.textIndent.replace('px', '')
            if (currentIndent === '') {
                element.style.textIndent = indentSize
                return
            }
            let currentIndentSize = parseInt(currentIndent) + sizeIndent
            element.style.textIndent = currentIndentSize + 'px'
        })
        placeCaretAtEnd(selection.SelectedElements.pop())
        addContentState()
    }

    let policeRemoveIndentCallback = () => {
        let selection = getSelection(true)
        let sizeIndent = parseInt(indentSize.replace('px', ''))
        selection.SelectedElements.forEach((element) => {
            let currentIndent = element.style.textIndent.replace('px', '')
            let currentIndentSize = parseInt(currentIndent) - sizeIndent
            if (currentIndent !== '' && currentIndentSize > 0) {
                element.style.textIndent = currentIndentSize + 'px'
                return
            }
            element.style.textIndent = ''
        })
        placeCaretAtEnd(selection.SelectedElements.pop())
        addContentState()
    }

    let policeAddNumberedListCallback = () => {
        let selection = getSelection()
        let numberedList = document.createElement('ol')
        let firstElement = document.createElement('li')
        let mainContent = document.querySelector('#html-content-editor')
        numberedList.style.display = 'flex'
        numberedList.style.flexDirection = 'column'
        numberedList.contentEditable = 'true'
        numberedList.appendChild(firstElement)
        if (selection.SelectedElements.length > 0) {
            let container = selection.SelectedElements.pop().parentElement
            if (mainContent.children.length <= 0) {
                mainContent.appendChild(numberedList)
                placeCaretAtEnd(firstElement)
                return
            }
            if (container.nextSibling !== undefined && container.nextSibling !== null) {
                mainContent.insertBefore(numberedList, container.nextSibling)
                placeCaretAtEnd(firstElement)
                return
            }
            mainContent.appendChild(numberedList)
            placeCaretAtEnd(firstElement)
            return
        }
        mainContent.appendChild(numberedList)
        placeCaretAtEnd(firstElement)
        addContentState()
    }

    let policeAddOrderedListCallback = () => {
        let selection = getSelection()
        let orderedList = document.createElement('ul')
        let firstElement = document.createElement('li')
        let mainContent = document.querySelector('#html-content-editor')
        orderedList.style.display = 'flex'
        orderedList.style.flexDirection = 'column'
        orderedList.contentEditable = 'true'
        orderedList.appendChild(firstElement)
        if (selection.SelectedElements.length > 0) {
            let container = selection.SelectedElements.pop().parentElement
            if (mainContent.children.length <= 0) {
                mainContent.appendChild(orderedList)
                placeCaretAtEnd(firstElement)
                return
            }
            if (container.nextSibling !== undefined && container.nextSibling !== null) {
                mainContent.insertBefore(orderedList, container.nextSibling)
                placeCaretAtEnd(firstElement)
                return
            }
            mainContent.appendChild(orderedList)
            placeCaretAtEnd(firstElement)
            return
        }
        mainContent.appendChild(orderedList)
        placeCaretAtEnd(firstElement)
        addContentState()
    }

    let addImageCallback = (image) => {
        let selection = getSelection()
        let mainContent = document.querySelector('#html-content-editor')
        let imageContainer = document.createElement('div')
        let imageToAdd = document.createElement('img')
        imageContainer.style.display = 'flex'
        imageContainer.style.flexWrap = 'wrap'
        imageContainer.contentEditable = 'true'
        imageToAdd.src = image
        imageContainer.appendChild(imageToAdd)
        if (selection.SelectedElements.length <= 0) {
            mainContent.appendChild(imageContainer)
            return
        }
        let container
        let currentNode = selection.SelectedElements.pop()
        while (container === undefined) {
            if (currentNode.tagName === 'DIV') {
                container = currentNode
            }
            currentNode = currentNode.parentElement
        }
        if (container.nextSibling === null || container.nextSibling === undefined) {
            mainContent.insertBefore(imageContainer, container.nextSibling)
            placeCaretAtEnd(imageContainer)
            addContentState()
            return
        }
        mainContent.appendChild(imageContainer)
        placeCaretAtEnd(imageContainer)
        addContentState()
    }

    // Initialization function
    let initialize = () => {
        let head = document.getElementsByTagName('HEAD')[0]
        let style = document.createElement('style')
        let googleMaterial = document.createElement('link')
        let root = document.querySelector('#' + mainRoot)
        let toolbar = document.createElement('div')
        let policeModificationContainer = document.createElement('div')
        let imageOptionsContainer = document.createElement('div')
        let actionRevokersContainer = document.createElement('div')
        let content = document.createElement('div')
        let firstContainer = document.createElement('div')
        let firstParagraph = document.createElement('p')
        let policeSelection,
            sizeSelection,
            colorSelection,
            boldSelection,
            italicSelection,
            underlineSelection,
            textAlignmentSelection,
            indentSelection,
            numberedListSelection,
            orderedListSelection,
            imageSelection,
            undoSelection,
            redoSelection,
            morePoliceOptionsSelection
        screenWidth = window.screen.width
        style.type = 'text/css'
        style.innerHTML = `
        #html-content-editor { 
            overflow-x: hidden; 
        } 
        #html-content-editor::-webkit-scrollbar-track { 
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #f5f5f5;\
        } 
        #html-content-editor::-webkit-scrollbar { 
            width: 6px; 
            height: 6px; 
            background-color: #F5F5F5;
        } 
        #html-content-editor::-webkit-scrollbar-thumb { 
            background-color: #000000; 
        } 
        div[contenteditable=\'true\'], ul[contenteditable=\'true\'], ol[contenteditable=\'true\'] { 
            outline: none;
        }
        div[contenteditable=\'true\']:hover, ul[contenteditable=\'true\']:hover, ol[contenteditable=\'true\']:hover { 
            cursor: text;
        }
        div[contenteditable=\'true\']:focus, ul[contenteditable=\'true\']:focus, ol[contenteditable=\'true\']:focus { 
            border-bottom: 1px solid;
            border-color: #275C8C;
        }
        input,
        textarea,
        div[contenteditable=\'true\'] {
            -webkit-user-select: text;
            user-select: text;
        }
        #${mainRoot} * {
            box-sizing: border-box;
        }`
        googleMaterial.rel = 'stylesheet'
        googleMaterial.type = 'text/css'
        googleMaterial.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
        head.appendChild(googleMaterial)
        head.appendChild(style)

        toolbar.id = 'toolbar'
        policeModificationContainer.id = 'police-modification-container'
        imageOptionsContainer.id = 'image-options-container'
        actionRevokersContainer.id = 'action-revokers-container'
        content.id = 'html-content-editor'

        root.style.width = 'auto'
        root.style.height = 'auto'

        toolbar.style.display = 'inline-flex'
        toolbar.style.flexWrap = 'wrap'
        toolbar.style.marginBottom = '10px'

        policeModificationContainer.style.display = 'inline-flex'
        policeModificationContainer.style.flexWrap = 'wrap'
        policeModificationContainer.style.border = '1px solid'
        policeModificationContainer.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        policeModificationContainer.style.marginRight = '0.3em'
        policeModificationContainer.style.backgroundColor = 'white'

        imageOptionsContainer.style.display = 'inline-flex'
        imageOptionsContainer.style.flexWrap = 'wrap'
        imageOptionsContainer.style.border = '1px solid'
        imageOptionsContainer.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        imageOptionsContainer.style.marginRight = '0.3em'
        imageOptionsContainer.style.backgroundColor = 'white'

        actionRevokersContainer.style.display = 'inline-flex'
        actionRevokersContainer.style.flexWrap = 'wrap'
        actionRevokersContainer.style.border = '1px solid'
        actionRevokersContainer.style.borderColor = 'rgba(0, 0, 0, 0.1)'
        actionRevokersContainer.style.backgroundColor = 'white'

        content.style.height = mainRootHeight
        content.style.maxHeight = mainRootHeight
        content.style.margin = '0'
        content.style.padding = '5px'
        content.style.overflowY = 'auto'
        content.style.outline = 'none'
        content.style.border = '3px solid'
        content.style.borderRadius = '5px'
        content.style.borderColor = '#275C8C'
        content.style.backgroundColor = 'white'
        content.style.width = '631px'

        document.addEventListener('selectionchange', () => {
            let activeSelection = document.getSelection()
            if (toolbar.contains(activeSelection.anchorNode) || activeSelection.anchorNode === undefined || activeSelection.anchorNode === null) {
                return
            }
            if (activeSelection.type === 'Caret') {
                let activeTag = activeSelection.anchorNode
                if (activeSelection.anchorNode.tagName === undefined && activeSelection.anchorNode.parentElement.tagName === 'SOMUM-CUSTOM-STYLE') {
                    activeTag = activeSelection.anchorNode.parentNode
                } else if (activeSelection.anchorNode.tagName === 'SOMUM-CUSTOM-STYLE') {
                    activeTag = activeSelection.anchorNode.lastChild
                }
                if (activeTag.tagName === 'SOMUM-CUSTOM-STYLE') {
                    selection = {
                        ActiveElements: [activeTag],
                        HasSelection: false,
                        StartOffset: activeSelection.anchorOffset,
                        EndOffset: activeSelection.focusOffset,
                    }
                }
                return
            }
            let firstNode
            let secondNode
            if (activeSelection.anchorNode.tagName === undefined) {
                firstNode = activeSelection.anchorNode.parentElement
            } else {
                firstNode = activeSelection.anchorNode
            }
            if (activeSelection.focusNode.tagName === undefined) {
                secondNode = activeSelection.focusNode.parentElement
            } else {
                secondNode = activeSelection.focusNode
            }
            if (firstNode === secondNode) {
                selection = {
                    ActiveElements: [firstNode],
                    HasSelection: true,
                    StartOffset: activeSelection.anchorOffset < activeSelection.focusOffset ? activeSelection.anchorOffset : activeSelection.focusOffset,
                    EndOffset: activeSelection.anchorOffset < activeSelection.focusOffset ? activeSelection.focusOffset : activeSelection.anchorOffset,
                }
                return
            }
            let container = firstNode
            while (container.tagName !== 'P') {
                container = container.parentElement
            }
            console.log(container.children)
            let firstNodeIndex
            let secondNodeIndex
            for (let i = 0; i < container.children.length; i++) {
                if (container.children[i] === firstNode) {
                    firstNodeIndex = i
                }
                if (container.children[i] === secondNode) {
                    secondNodeIndex = i
                }
                if (firstNodeIndex !== undefined && secondNodeIndex !== undefined) {
                    break
                }
            }
            let listOfElements = []
            let startPoint = firstNodeIndex < secondNodeIndex ? firstNodeIndex : secondNodeIndex
            let endPoint = firstNodeIndex < secondNodeIndex ? secondNodeIndex : firstNodeIndex
            for (let i = startPoint; i <= endPoint; i++) {
                listOfElements.push(container.children[i])
            }
            selection = {
                ActiveElements: listOfElements,
                HasSelection: true,
                StartOffset: firstNodeIndex < secondNodeIndex ? activeSelection.anchorOffset : activeSelection.focusOffset,
                EndOffset: firstNodeIndex < secondNodeIndex ? activeSelection.focusOffset : activeSelection.anchorOffset,
            }
            return
        })

        policeSelection = createPoliceSelection(policeChangeCallback)
        sizeSelection = createSizeSelection(policeSizeChangeCallback)
        colorSelection = createColorSelection(policeColorChangeCallback)
        boldSelection = createBoldSelection(policeBoldToggleCallback)
        italicSelection = createItalicSelection(policeItalicToggleCallback)
        underlineSelection = createUnderlineSelection(policeUnderlineToggleCallback)
        textAlignmentSelection = createTextAlignementSelection(policeTextAlignementLeftCallback, policeTextAlignementCenterCallback, policeTextAlignementRightCallback)
        indentSelection = createIndentSelection(policeAddIndentCallback, policeRemoveIndentCallback)
        numberedListSelection = createNumberedListSelection(policeAddNumberedListCallback)
        orderedListSelection = createOrderedListSelection(policeAddOrderedListCallback)
        imageSelection = createImageSelection(addImageCallback)
        undoSelection = createUndoSelection(goBackInContentState)
        redoSelection = createRedoSelection(rollbackInContentState)

        if (window.screen.width >= 680) {
            policeModificationContainer.appendChild(policeSelection)
            policeModificationContainer.appendChild(sizeSelection)
            policeModificationContainer.appendChild(colorSelection)
            policeModificationContainer.appendChild(boldSelection)
            policeModificationContainer.appendChild(italicSelection)
            policeModificationContainer.appendChild(underlineSelection)
            policeModificationContainer.appendChild(textAlignmentSelection)
            policeModificationContainer.appendChild(indentSelection)
            policeModificationContainer.appendChild(numberedListSelection)
            policeModificationContainer.appendChild(orderedListSelection)
        } else {
            let morePoliceOptionsContainer = document.createElement('div')
            let morePoliceOptionsThumbnail = document.createElement('span')
            let morePoliceOptionsDropdown = document.createElement('div')

            morePoliceOptionsContainer.style.display = 'inline-flex'
            morePoliceOptionsContainer.style.flexWrap = 'wrap'
            morePoliceOptionsContainer.style.flexDirection = 'column'
            morePoliceOptionsContainer.style.userSelect = 'none'

            morePoliceOptionsThumbnail.classList.add('material-icons')
            morePoliceOptionsThumbnail.innerHTML = 'more_horiz'
            morePoliceOptionsThumbnail.style.padding = '5px'
            morePoliceOptionsThumbnail.style.fontSize = '26px'
            morePoliceOptionsThumbnail.style.color = '#275C8C'

            let openMorePoliceOptionsDropdown = () => {
                morePoliceDropdownToggled = true
                morePoliceOptionsDropdown.style.display = 'inline-flex'
            }

            let closeMorePoliceOptionsDropdown = () => {
                morePoliceDropdownToggled = false
                morePoliceOptionsDropdown.style.display = 'none'
            }

            window.openMorePoliceOptionsDropdown = openMorePoliceOptionsDropdown
            window.closeMorePoliceOptionsDropdown = closeMorePoliceOptionsDropdown
            morePoliceOptionsThumbnail.addEventListener('click', () => {
                morePoliceDropdownToggled = !morePoliceDropdownToggled
                if (morePoliceDropdownToggled) {
                    window.openMorePoliceOptionsDropdown()
                    return
                }
                window.closeMorePoliceOptionsDropdown()
            })

            morePoliceOptionsDropdown.style.position = 'absolute'
            morePoliceOptionsDropdown.style.marginTop = '34px'
            morePoliceOptionsDropdown.style.padding = '6px 0px'
            morePoliceOptionsDropdown.style.borderRadius = '5px'
            morePoliceOptionsDropdown.style.border = '1px solid rgba(0, 0, 0, 0.1)'
            morePoliceOptionsDropdown.style.boxShadow = 'lightgray 20px 20px 50px'
            morePoliceOptionsDropdown.style.flexWrap = 'wrap'
            morePoliceOptionsDropdown.style.flexDirection = 'column'
            morePoliceOptionsDropdown.style.alignItems = 'center'
            morePoliceOptionsDropdown.style.backgroundColor = 'white'
            morePoliceOptionsDropdown.style.display = 'none'

            morePoliceOptionsDropdown.appendChild(sizeSelection)
            morePoliceOptionsDropdown.appendChild(colorSelection)
            morePoliceOptionsDropdown.appendChild(boldSelection)
            morePoliceOptionsDropdown.appendChild(italicSelection)
            morePoliceOptionsDropdown.appendChild(underlineSelection)
            morePoliceOptionsDropdown.appendChild(textAlignmentSelection)
            morePoliceOptionsDropdown.appendChild(indentSelection)
            morePoliceOptionsDropdown.appendChild(numberedListSelection)
            morePoliceOptionsDropdown.appendChild(orderedListSelection)

            morePoliceOptionsContainer.appendChild(morePoliceOptionsThumbnail)
            morePoliceOptionsContainer.appendChild(morePoliceOptionsDropdown)

            policeModificationContainer.appendChild(policeSelection)
            policeModificationContainer.appendChild(morePoliceOptionsContainer)
            morePoliceOptionsSelection = morePoliceOptionsContainer

            content.style.width = '290px'
            content.style.maxWidth = '290px'
        }

        imageOptionsContainer.appendChild(imageSelection)

        actionRevokersContainer.appendChild(undoSelection)
        actionRevokersContainer.appendChild(redoSelection)

        toolbar.appendChild(policeModificationContainer)
        toolbar.appendChild(imageOptionsContainer)
        toolbar.appendChild(actionRevokersContainer)

        document.onclick = (event) => {
            let childSelected = false
            if (window.closePoliceDropdown && !policeSelection.contains(event.target) && policeDropdownToggled) {
                window.closePoliceDropdown()
            }
            if (window.closeSizeDropdown && !sizeSelection.contains(event.target) && sizeDropdownToggled) {
                window.closeSizeDropdown()
            }
            if (window.closeTextAlignDropdown && !textAlignmentSelection.contains(event.target) && textAlignDropdownToggled) {
                window.closeTextAlignDropdown()
            }
            if (window.closeIndentDropdown && !indentSelection.contains(event.target) && indentDropdownToggled) {
                window.closeIndentDropdown()
            }
            if (morePoliceOptionsSelection && window.closeMorePoliceOptionsDropdown && !morePoliceOptionsSelection.contains(event.target) && morePoliceDropdownToggled) {
                window.closeMorePoliceOptionsDropdown()
            }
            for (let i = 0; i < content.children.length; i++) {
                if (content.children[i].contains(event.target)) {
                    childSelected = true
                    break
                }
            }
            if (!childSelected && content.contains(event.target)) {
                placeCaretAtEnd(content.lastChild.firstChild)
            }
        }

        let containerWidth = parseInt(content.style.width.replace('px', '')) - 16

        firstContainer.style.display = 'flex'
        firstContainer.style.minHeight = '18px'
        firstContainer.style.maxWidth = `${containerWidth}px`
        firstContainer.style.width = `${containerWidth}px`

        firstParagraph.contentEditable = 'true'
        firstParagraph.style.width = firstContainer.style.width
        firstParagraph.style.maxWidth = firstContainer.style.width
        firstParagraph.style.minHeight = '18px'
        firstParagraph.style.cursor = 'text'
        firstParagraph.style.outline = 'none'
        firstParagraph.addEventListener('focusin', () => {
            firstParagraph.style.borderBottom = '1px solid rgb(39, 92, 140)'
        })
        firstParagraph.addEventListener('focusout', () => {
            firstParagraph.style.borderBottom = 'none'
        })

        firstContainer.appendChild(firstParagraph)

        content.appendChild(firstContainer)

        root.appendChild(toolbar)
        root.appendChild(content)

        contentState.push(content.cloneNode(true))

        if (!window.onresize) {
            window.onresize = () => {
                if (screenWidth !== window.screen.width) {
                    root.innerHTML = ''
                    initialize()
                }
            }
        }
    }

    initialize()
})
