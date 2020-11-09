let mainRoot = "somum-sourriel"
let mainRootHeight = "410px"
let indentSize = "20px"
let policeDropdownToggled = false
let sizeDropdownToggled = false
let textAlignDropdownToggled = false
let indentDropdownToggled = false
let morePoliceDropdownToggled = false
let layoutOptionToggled = false
let layoutSelected
let policeSelected = "sans-serif"
let sizeSelected = "small"
let colorSelected = "#000000"
let contentState = []
let contentIndex = 0
let screenWidth
let selection
let latestScreenWidth
let selectionAlreadyChanged = false

document.addEventListener("DOMContentLoaded", () => {
	// Content creation functions
	let createPoliceElementForContent = (name, value, policeContent, policeDropdownArrow, selectedContent, callback) => {
		let element = document.createElement("div")
		element.id = value
		element.textContent = name
		element.style.color = "#275C8C"
		element.style.padding = "8px 16px"
		element.style.width = "100%"
		element.style.textAlign = "center"
		element.style.fontFamily = "Arial"
		element.style.userSelect = "none"
		element.style.cursor = "pointer"

		// Event listeners on each item in the dropdown
		element.addEventListener("mouseover", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
		})
		element.addEventListener("mouseout", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})
		element.addEventListener("click", () => {
			selectedContent.textContent = name
			selectedContent.width = "74px"
			policeContent.style.display = "none"
			policeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
			policeDropdownArrow.style.margin = "6px 0px 0px 10px"
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
		let element = document.createElement("div")
		element.id = value
		element.textContent = name
		element.style.color = "#275C8C"
		element.style.padding = "8px 16px"
		element.style.textAlign = "center"
		element.style.fontFamily = "Arial"
		element.style.userSelect = "none"
		element.style.cursor = "pointer"
		element.style.width = "100%"
		element.addEventListener("mouseover", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
		})
		element.addEventListener("mouseout", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})
		element.addEventListener("click", () => {
			sizeContent.style.display = "none"
			sizeDropdownArrow.style.border = "5px solid transparent"
			sizeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
			sizeDropdownArrow.style.margin = "15px 0px 0px 0px"
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
		let element = document.createElement("div")
		element.appendChild(image)
		element.id = name
		element.style.width = "100%"
		element.style.display = "flex"
		element.style.flexWrap = "wrap"
		element.style.justifyContent = "center"
		element.style.padding = "0 6px"
		element.style.userSelect = "none"
		element.style.cursor = "pointer"
		element.addEventListener("mouseover", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
		})
		element.addEventListener("mouseout", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})
		element.addEventListener("click", () => {
			indentDropdownToggled = false
			indentContent.style.display = "none"
			indentThumbnailArrow.style.borderColor = "#275C8C transparent transparent transparent"
			indentThumbnailArrow.style.margin = "15px 0px 0px 0px"
			if (callback === undefined) {
				return
			}
			callback("Toggled")
		})
		return element
	}

	let createTextAlignElementForContent = (name, image, textAlignementContent, textAlignementThumbnailArrow, callback) => {
		let element = document.createElement("div")
		element.appendChild(image)
		element.id = name
		element.style.width = "100%"
		element.style.display = "flex"
		element.style.flexWrap = "wrap"
		element.style.justifyContent = "center"
		element.style.padding = "0 6px"
		element.style.userSelect = "none"
		element.style.cursor = "pointer"
		element.addEventListener("mouseover", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
		})
		element.addEventListener("mouseout", () => {
			element.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})
		element.addEventListener("click", () => {
			textAlignDropdownToggled = false
			textAlignementContent.style.display = "none"
			textAlignementThumbnailArrow.style.borderColor = "black transparent transparent transparent"
			textAlignementThumbnailArrow.style.margin = "15px 0px 0px 0px"
			if (callback === undefined) {
				return
			}
			callback("Toggled")
		})
		return element
	}
	let createRightClickMenu = (xPosition, yPosition, layoutOptionToggledCallback, colorChangeOptionToggledCallback, closeOptionCallback) => {
		if (isNaN(xPosition) || isNaN(yPosition)) {
			return undefined
		}
		let selectedLayout = layoutSelected
		let container = document.createElement("div")
		let layoutOptionContainer = document.createElement("div")
		let layoutOptionThumbnail = document.createElement("span")
		let layoutOptionText = document.createElement("p")
		container.style.display = "inline-flex"
		container.style.flexWrap = "wrap"
		container.style.flexDirection = "column"
		container.style.position = "fixed"
		container.style.top = `${yPosition}px`
		container.style.left = `${xPosition}px`
		container.style.padding = "6px 0px"
		container.style.borderRadius = "5px"
		container.style.border = "1px solid rgba(0, 0, 0, 0.1)"
		container.style.boxShadow = "lightgrey 20px 20px 50px"
		container.style.backgroundColor = "white"
		layoutOptionContainer.style.display = "inline-flex"
		layoutOptionContainer.style.flexWrap = "wrap"
		layoutOptionContainer.style.flexDirection = "row"
		layoutOptionContainer.style.justifyContent = "flex-start"
		layoutOptionContainer.style.alignItems = "center"
		layoutOptionContainer.style.cursor = "pointer"
		layoutOptionContainer.style.padding = "4px 8px"
		layoutOptionContainer.addEventListener("click", () => {
			if (closeOptionCallback !== undefined) {
				closeOptionCallback()
			}
			let popupPlaceHolder = document.createElement("div")
			let popupContainer = document.createElement("div")
			let popupHeader = document.createElement("div")
			let popupBody = document.createElement("div")
			let popupFooter = document.createElement("div")
			let popupTitle = document.createElement("p")
			let popupContent = document.createElement("p")
			let confirmationButton = document.createElement("button")
			let cancelButton = document.createElement("button")
			let body = document.querySelector("body")
			body.style.width = "100%"
			body.style.height = "100%"
			body.style.position = "absolute"

			popupPlaceHolder.style.position = "absolute"
			popupPlaceHolder.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
			popupPlaceHolder.style.width = "100%"
			popupPlaceHolder.style.height = "100%"
			popupPlaceHolder.style.display = "flex"
			popupPlaceHolder.style.justifyContent = "center"
			popupPlaceHolder.style.alignItems = "center"
			popupPlaceHolder.style.transition = "opacity 0.3s ease"
			popupPlaceHolder.style.top = "0"
			popupPlaceHolder.style.left = "0"

			popupContainer.style.display = "flex"
			popupContainer.style.flexDirection = "column"
			popupContainer.style.justifyContent = "flex-start"
			popupContainer.style.alignItems = "flex-start"
			popupContainer.style.borderRadius = "0.1em"
			popupContainer.style.width = "450px"
			popupContainer.style.backgroundColor = "white"

			popupHeader.style.display = "flex"
			popupHeader.style.backgroundColor = "rgb(39, 92, 140)"
			popupHeader.style.width = "100%"
			popupHeader.style.justifyContent = "space-between"
			popupHeader.style.flexWrap = "wrap"
			popupHeader.style.borderTopRightRadius = "0.1em"
			popupHeader.style.borderTopLeftRadius = "0.1em"
			popupHeader.style.padding = "0.5em 1em"

			popupBody.style.width = "100%"
			popupBody.style.padding = "0.5em 1em"

			popupFooter.style.display = "flex"
			popupFooter.style.flexWrap = "wrap"
			popupFooter.style.justifyContent = "space-between"
			popupFooter.style.alignItems = "center"
			popupFooter.style.padding = "0.5em 1em"
			popupFooter.style.width = "100%"
			popupFooter.style.borderBottomLeftRadius = "0.1em"
			popupFooter.style.borderBottomRightRadius = "0.1em"

			popupTitle.textContent = "Confirmation"
			popupTitle.style.color = "white"
			popupTitle.style.fontFamily = "'Roboto', sans-serif"
			popupTitle.style.fontSize = "26px"
			popupTitle.style.fontWeight = "bold"

			popupContent.style.fontFamily = "'Roboto', sans-serif"
			popupContent.style.fontSize = "16px"
			popupContent.textContent = "Vous êtes sur le point de changer de méthode de cadrage. Cette opération mènera à la perte des informations déjà dans la fenêtre d'édition. Voulez-vous tout de même continuer?"

			let destroyPopup = () => {
				body.removeChild(popupPlaceHolder)
			}
			confirmationButton.textContent = "Continuer"
			confirmationButton.style.fontFamily = "'Roboto', sans-serif"
			confirmationButton.style.fontSize = "16px"
			confirmationButton.style.padding = "0.5em 1em"
			confirmationButton.style.cursor = "pointer"
			confirmationButton.style.backgroundColor = "transparent"
			confirmationButton.style.color = "rgb(39, 92, 140)"
			confirmationButton.style.fontWeight = "bold"
			confirmationButton.style.outline = "none"
			confirmationButton.style.border = "1px solid rgb(39, 92, 140)"
			confirmationButton.style.outlineOffset = "-1px"
			confirmationButton.style.transition = "all 0.3s ease"
			confirmationButton.addEventListener("click", () => {
				layoutOptionToggled = !layoutOptionToggled
				if (layoutOptionToggledCallback === undefined) {
					return
				}
				layoutOptionToggledCallback(layoutOptionToggled)
				destroyPopup()
			})
			confirmationButton.addEventListener("mouseenter", () => {
				confirmationButton.style.color = "white"
				confirmationButton.style.backgroundColor = "rgb(39, 92, 140)"
			})
			confirmationButton.addEventListener("mouseout", () => {
				confirmationButton.style.color = "rgb(39, 92, 140)"
				confirmationButton.style.backgroundColor = "transparent"
			})

			cancelButton.textContent = "Annuler"
			cancelButton.style.fontFamily = "'Roboto', sans-serif"
			cancelButton.style.fontSize = "16px"
			cancelButton.style.padding = "0.5em 1em"
			cancelButton.style.cursor = "pointer"
			cancelButton.style.backgroundColor = "transparent"
			cancelButton.style.color = "rgb(39, 92, 140)"
			cancelButton.style.fontWeight = "bold"
			cancelButton.style.outline = "none"
			cancelButton.style.border = "1px solid rgb(39, 92, 140)"
			cancelButton.style.outlineOffset = "-1px"
			cancelButton.style.transition = "all 0.3s ease"
			cancelButton.addEventListener("click", () => {
				if (closeOptionCallback === undefined) {
					return
				}
				closeOptionCallback()
				destroyPopup()
			})
			cancelButton.addEventListener("mouseenter", () => {
				cancelButton.style.color = "white"
				cancelButton.style.backgroundColor = "rgb(39, 92, 140)"
			})
			cancelButton.addEventListener("mouseout", () => {
				cancelButton.style.color = "rgb(39, 92, 140)"
				cancelButton.style.backgroundColor = "transparent"
			})

			popupFooter.appendChild(confirmationButton)
			popupFooter.appendChild(cancelButton)

			popupBody.appendChild(popupContent)

			popupHeader.appendChild(popupTitle)

			popupContainer.appendChild(popupHeader)
			popupContainer.appendChild(popupBody)
			popupContainer.appendChild(popupFooter)

			popupPlaceHolder.appendChild(popupContainer)

			body.appendChild(popupPlaceHolder)
		})
		layoutOptionContainer.addEventListener("mouseenter", () => {
			layoutOptionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
		})
		layoutOptionContainer.addEventListener("mouseleave", () => {
			layoutOptionContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})
		layoutOptionThumbnail.classList.add("material-icons")
		layoutOptionThumbnail.innerHTML = "view_compact"
		layoutOptionThumbnail.style.fontSize = "26px"
		layoutOptionThumbnail.style.color = "rgb(39, 92, 140)"
		layoutOptionThumbnail.style.padding = "0 6px 0 0"
		layoutOptionText.style.fontFamily = "'Roboto', sans-serif"
		layoutOptionText.style.color = "rgb(39, 92, 140)"
		layoutOptionText.textContent = layoutOptionToggled ? "Utiliser le mode de texte" : "Utiliser le mode cadré"
		container.appendChild(layoutOptionContainer)
		if (layoutSelected !== undefined && layoutOptionToggled) {
			let colorChangeOptionContainer = document.createElement("div")
			let colorChangeOptionThumbnail = document.createElement("span")
			let colorChangeOptionText = document.createElement("p")
			let colorChangeOptionInput = document.createElement("input")
			let optionsBreak = document.createElement("div")
			colorChangeOptionContainer.style.display = "inline-flex"
			colorChangeOptionContainer.style.flexWrap = "wrap"
			colorChangeOptionContainer.style.flexDirection = "row"
			colorChangeOptionContainer.style.justifyContent = "flex-start"
			colorChangeOptionContainer.style.alignItems = "center"
			colorChangeOptionContainer.style.cursor = "pointer"
			colorChangeOptionContainer.style.padding = "4px 8px"
			colorChangeOptionContainer.addEventListener("click", () => {
				colorChangeOptionInput.click()
			})
			colorChangeOptionContainer.addEventListener("mouseenter", () => {
				colorChangeOptionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
			})
			colorChangeOptionContainer.addEventListener("mouseleave", () => {
				colorChangeOptionContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
			})
			colorChangeOptionThumbnail.classList.add("material-icons")
			colorChangeOptionThumbnail.innerHTML = "palette"
			colorChangeOptionThumbnail.style.fontSize = "26px"
			colorChangeOptionThumbnail.style.color = "rgb(39, 92, 140)"
			colorChangeOptionThumbnail.style.padding = "0 6px 0 0"
			colorChangeOptionText.style.fontFamily = "'Roboto', sans-serif"
			colorChangeOptionText.style.color = "rgb(39, 92, 140)"
			colorChangeOptionText.textContent = "Changer la couleur de la section"
			colorChangeOptionInput.style.display = "none"
			colorChangeOptionInput.type = "color"
			let color = selectedLayout.style.backgroundColor
			color = color.replace("rgb", "")
			color = color.replace("(", "")
			color = color.replace(")", "")
			color = color.replace(" ", "")
			color = color.replace(" ", "")
			let colors = color.split(",")
			let targetColor = "#"
			colors.forEach((element) => {
				let hexElement = parseInt(element).toString(16)
				targetColor += hexElement.length == 1 ? "0" + hexElement : hexElement
			})
			colorChangeOptionInput.value = targetColor
			colorChangeOptionInput.addEventListener("change", (event) => {
				if (colorChangeOptionToggledCallback === undefined) {
					return
				}
				colorChangeOptionToggledCallback(event.target.value, selectedLayout)
				event.target.value = ""
			})
			optionsBreak.style.backgroundColor = "rgba(39, 92, 140, 0.4)"
			optionsBreak.style.height = "0.3px"
			optionsBreak.style.width = "100%"
			optionsBreak.style.margin = "4px 0"
			colorChangeOptionContainer.appendChild(colorChangeOptionThumbnail)
			colorChangeOptionContainer.appendChild(colorChangeOptionText)
			colorChangeOptionContainer.appendChild(colorChangeOptionInput)
			container.appendChild(optionsBreak)
			container.appendChild(colorChangeOptionContainer)
		}

		layoutOptionContainer.appendChild(layoutOptionThumbnail)
		layoutOptionContainer.appendChild(layoutOptionText)
		return container
	}

	let createPoliceSelection = (callbackPoliceChangeFunction) => {
		// Main structure of the police selection functions
		let policeContainer = document.createElement("div")
		let policeDropdown = document.createElement("div")
		let policeDropdownArrow = document.createElement("div")
		let policeContent = document.createElement("div")

		// Value handling part of the dropdown
		let selectedPoliceContent = document.createElement("p")

		// IDs attributions
		policeContainer.id = "police-container"
		policeDropdown.id = "police-dropdown"
		policeDropdownArrow.id = "police-dropdown-arrow"
		policeContent.id = "police-content"
		selectedPoliceContent.id = "selected-police-content"

		// Setting up main architecture of the dropdown
		policeDropdown.appendChild(selectedPoliceContent)
		policeDropdown.appendChild(policeDropdownArrow)

		// Adding content to the dropdown
		policeContent.appendChild(createPoliceElementForContent("Sans Serif", "Arial, Helvetica, sans-serif", policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))
		policeContent.appendChild(createPoliceElementForContent("Serif", '"Palatino Linotype", "Book Antiqua", Palatino, serif', policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))
		policeContent.appendChild(createPoliceElementForContent("Georgia", "Georgia, serif", policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))
		policeContent.appendChild(createPoliceElementForContent("Tahoma", "Tahoma, Geneva, sans-serif", policeContent, policeDropdownArrow, selectedPoliceContent, callbackPoliceChangeFunction))

		// Setting up the police container
		policeContainer.style.display = "inline-flex"
		policeContainer.style.flexWrap = "wrap"
		policeContainer.style.flexDirection = "column"

		// Setting up police dropdown
		policeDropdown.style.backgroundColor = "white"
		policeDropdown.style.display = "inline-flex"
		policeDropdown.style.flexOrientation = "row"
		policeDropdown.style.flexWrap = "wrap"
		policeDropdown.style.justifyContent = "space-between"
		policeDropdown.style.alignItems = "center"
		policeDropdown.style.padding = "8px 16px"
		policeDropdown.style.cursor = "pointer"
		policeDropdown.style.userSelect = "none"
		policeDropdown.style.width = "130px"

		let closePoliceDropdown = () => {
			policeDropdownToggled = false
			policeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
			policeDropdownArrow.style.margin = "6px 0px 0px 10px"
			policeContent.style.display = "none"
		}

		let openPoliceDropdown = () => {
			policeDropdownToggled = true
			policeDropdownArrow.style.borderColor = "transparent transparent #275C8C transparent"
			policeDropdownArrow.style.margin = "0px 0px 6px 10px"
			policeContent.style.display = "inline-flex"
		}

		window.openPoliceDropdown = openPoliceDropdown
		window.closePoliceDropdown = closePoliceDropdown

		// Enable toggle functions on the dropdown
		policeDropdown.addEventListener("click", () => {
			policeDropdownToggled = !policeDropdownToggled
			if (policeDropdownToggled) {
				window.openPoliceDropdown()
				return
			}
			window.closePoliceDropdown()
		})

		// Setting up police content
		selectedPoliceContent.style.color = "#275C8C"
		selectedPoliceContent.style.fontFamily = "Arial"
		selectedPoliceContent.textContent = "Sans Serif"

		// Setting up police dropdown arrow
		policeDropdownArrow.style.content = ""
		policeDropdownArrow.style.width = "0"
		policeDropdownArrow.style.height = "0"
		policeDropdownArrow.style.border = "5px solid transparent"
		policeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
		policeDropdownArrow.style.margin = "6px 0px 0px 10px"

		// Setting police dropdown content
		policeContent.style.display = "none"
		policeContent.style.position = "absolute"
		policeContent.style.marginTop = "34px"
		policeContent.style.padding = "6px 0"
		policeContent.style.borderRadius = "5px"
		policeContent.style.border = "1px solid"
		policeContent.style.borderColor = "rgba(0, 0, 0, 0.1)"
		policeContent.style.boxShadow = "20px 20px 50px lightgray"
		policeContent.style.flexDirection = "column"
		policeContent.style.flexWrap = "wrap"
		policeContent.style.alignItems = "center"
		policeContent.style.backgroundColor = "white"

		policeContainer.appendChild(policeDropdown)
		policeContainer.appendChild(policeContent)
		return policeContainer
	}

	let createSizeSelection = (callBackSizeChange) => {
		// Main structure of the size selection functions
		let sizeContainer = document.createElement("div")
		let sizeThumbnail = document.createElement("div")
		let sizeContent = document.createElement("div")

		// Esthetics for the dropdown
		let imageThumbnail = document.createElement("span")
		let sizeDropdownArrow = document.createElement("div")

		// Setting up the IDs
		sizeContainer.id = "size-container"
		sizeThumbnail.id = "size-dropdown-thumbnail"
		sizeContent.id = "size-content"
		sizeDropdownArrow.id = "size-dropdown-arrow"

		// Setting up the container
		sizeContainer.style.display = "inline-flex"
		sizeContainer.style.flexDirection = "column"
		sizeContainer.style.flexWrap = "wrap"
		sizeContainer.style.userSelect = "none"

		// Setting up the thumbnail container
		sizeThumbnail.style.display = "inline-flex"
		sizeThumbnail.style.cursor = "pointer"
		sizeThumbnail.style.color = "#275C8C"

		let openSizeDropdown = () => {
			sizeDropdownToggled = true
			sizeDropdownArrow.style.borderColor = "transparent transparent #275C8C transparent"
			sizeDropdownArrow.style.margin = "10px 0px 0px 0px"
			sizeContent.style.display = "inline-flex"
		}

		let closeSizeDropdown = () => {
			sizeDropdownToggled = false
			sizeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
			sizeDropdownArrow.style.margin = "15px 0px 0px 0px"
			sizeContent.style.display = "none"
		}

		window.openSizeDropdown = openSizeDropdown
		window.closeSizeDropdown = closeSizeDropdown

		sizeThumbnail.addEventListener("click", () => {
			sizeDropdownToggled = !sizeDropdownToggled
			if (sizeDropdownToggled) {
				window.openSizeDropdown()
				return
			}
			window.closeSizeDropdown()
		})

		// Setting up the thumbnail image
		imageThumbnail.style.padding = "5px"
		imageThumbnail.classList.add("material-icons")
		imageThumbnail.innerHTML = "format_size"
		imageThumbnail.style.fontSize = "26px"

		// Setting up the dropdown arrow
		sizeDropdownArrow.style.content = ""
		sizeDropdownArrow.style.width = "0"
		sizeDropdownArrow.style.height = "0"
		sizeDropdownArrow.style.border = "5px solid transparent"
		sizeDropdownArrow.style.borderColor = "#275C8C transparent transparent transparent"
		sizeDropdownArrow.style.margin = "15px 0px 0px 0px"

		// Setting up content styles
		sizeContent.style.display = "none"
		sizeContent.style.position = "absolute"
		sizeContent.style.marginTop = "36px"
		sizeContent.style.padding = "6px 0"
		sizeContent.style.borderRadius = "5px"
		sizeContent.style.border = "1px solid"
		sizeContent.style.borderColor = "rgba(0, 0, 0, 0.1)"
		sizeContent.style.boxShadow = "20px 20px 50px lightgray"
		sizeContent.style.flexDirection = "column"
		sizeContent.style.flexWrap = "wrap"
		sizeContent.style.alignItems = "center"
		sizeContent.style.backgroundColor = "white"

		// Setting up main architecture of the thumbnail
		sizeThumbnail.appendChild(imageThumbnail)
		sizeThumbnail.appendChild(sizeDropdownArrow)

		// Setting up content
		sizeContent.appendChild(createSizeElementForContent("Small", "small", sizeContent, sizeDropdownArrow, callBackSizeChange))
		sizeContent.appendChild(createSizeElementForContent("Medium", "medium", sizeContent, sizeDropdownArrow, callBackSizeChange))
		sizeContent.appendChild(createSizeElementForContent("Large", "large", sizeContent, sizeDropdownArrow, callBackSizeChange))
		sizeContent.appendChild(createSizeElementForContent("X-Large", "x-large", sizeContent, sizeDropdownArrow, callBackSizeChange))

		// Setting up content of the container
		sizeContainer.appendChild(sizeThumbnail)
		sizeContainer.appendChild(sizeContent)

		return sizeContainer
	}

	let createColorSelection = (callbackColorChange) => {
		// Main structure of the color selection functions
		let colorPickerContainer = document.createElement("div") // color-picker-container
		let colorPickerThumbnail = document.createElement("span") // color-picker-thumbnail
		let colorPickerControl = document.createElement("input") // color-picker-control

		// Setting up IDs of the elements
		colorPickerContainer.id = "color-picker-container"
		colorPickerThumbnail.id = "color-picker-thumbnail"
		colorPickerControl.id = "color-picker-control"

		// Setting up the container
		colorPickerContainer.style.display = "flex"
		colorPickerContainer.style.maxHeight = "36px"
		colorPickerContainer.style.cursor = "pointer"
		colorPickerContainer.style.userSelect = "none"

		// Setting up the thumbnail
		colorPickerThumbnail.style.maxHeight = "36px"
		colorPickerThumbnail.style.padding = "3px"
		colorPickerThumbnail.classList.add("material-icons")
		colorPickerThumbnail.innerHTML = "text_format"
		colorPickerThumbnail.style.fontSize = "30px"
		colorPickerThumbnail.style.color = "#275C8C"
		colorPickerThumbnail.addEventListener("click", () => {
			colorPickerControl.click()
		})

		// Setting up the color picker
		colorPickerControl.type = "color"
		colorPickerControl.style.display = "none"
		colorPickerControl.addEventListener("change", (event) => {
			if (callbackColorChange === undefined) {
				return
			}
			colorSelected = event.target.value
			callbackColorChange(event.target.value)
			event.target.value = ""
		})
		colorPickerContainer.appendChild(colorPickerThumbnail)
		colorPickerContainer.appendChild(colorPickerControl)
		return colorPickerContainer
	}

	let createBoldSelection = (callbackBoldChange) => {
		let boldContainer = document.createElement("div")
		let boldThumbnail = document.createElement("span")

		// Setting up IDs
		boldContainer.id = "bold-container"

		// Setting up container
		boldContainer.style.maxHeight = "36px"
		boldContainer.style.cursor = "pointer"
		boldContainer.style.userSelect = "none"
		boldContainer.addEventListener("mousedown", () => {
			boldContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackBoldChange === undefined) {
				return
			}
			callbackBoldChange("Toggled")
		})
		boldContainer.addEventListener("mouseup", () => {
			boldContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		// Setting up image thumbnail
		boldThumbnail.classList.add("material-icons")
		boldThumbnail.innerHTML = "format_bold"
		boldThumbnail.style.fontSize = "30px"
		boldThumbnail.style.padding = "3px"
		boldThumbnail.style.maxHeight = "36px"
		boldThumbnail.style.color = "#275C8C"

		// Adding the thumbnail to the container
		boldContainer.appendChild(boldThumbnail)
		return boldContainer
	}

	let createItalicSelection = (callbackItalicChange) => {
		let italicContainer = document.createElement("div")
		let italicThumbnail = document.createElement("span")

		// Setting up IDs
		italicContainer.id = "italic-container"

		// Setting up container
		italicContainer.style.maxHeight = "36px"
		italicContainer.style.cursor = "pointer"
		italicContainer.style.userSelect = "none"
		italicContainer.addEventListener("mousedown", () => {
			italicContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackItalicChange === undefined) {
				return
			}
			callbackItalicChange("Toggled")
		})
		italicContainer.addEventListener("mouseup", () => {
			italicContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		// Setting up image thumbnail
		italicThumbnail.classList.add("material-icons")
		italicThumbnail.innerHTML = "format_italic"
		italicThumbnail.style.fontSize = "30px"
		italicThumbnail.style.padding = "3px"
		italicThumbnail.style.maxHeight = "36px"
		italicThumbnail.style.color = "#275C8C"

		// Adding the thumbnail to the container
		italicContainer.appendChild(italicThumbnail)
		return italicContainer
	}

	let createUnderlineSelection = (callbackUnderlineChange) => {
		let underlineContainer = document.createElement("div")
		let underlineThumbnail = document.createElement("span")

		// Setting up IDs
		underlineContainer.id = "italic-container"

		// Setting up container
		underlineContainer.style.maxHeight = "36px"
		underlineContainer.style.cursor = "pointer"
		underlineContainer.style.userSelect = "none"
		underlineContainer.addEventListener("mousedown", () => {
			underlineContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			callbackUnderlineChange("Toggled")
		})

		underlineContainer.addEventListener("mouseup", () => {
			underlineContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		// Setting up image thumbnail
		underlineThumbnail.classList.add("material-icons")
		underlineThumbnail.innerHTML = "format_underlined"
		underlineThumbnail.style.fontSize = "26px"
		underlineThumbnail.style.padding = "5px"
		underlineThumbnail.style.maxHeight = "36px"
		underlineThumbnail.style.color = "#275C8C"

		// Adding the thumbnail to the container
		underlineContainer.appendChild(underlineThumbnail)
		return underlineContainer
	}

	let createOrderedListSelection = (callbackOrderedListToggle) => {
		let orderedListContainer = document.createElement("div")
		let orderedListThumbnail = document.createElement("span")

		// Setting up IDs
		orderedListContainer.id = "italic-container"

		// Setting up container
		orderedListContainer.style.maxHeight = "36px"
		orderedListContainer.style.cursor = "pointer"
		orderedListContainer.style.userSelect = "none"
		orderedListContainer.addEventListener("mousedown", () => {
			orderedListContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackOrderedListToggle === undefined) {
				return
			}
			callbackOrderedListToggle("Toggled")
		})

		orderedListContainer.addEventListener("mouseup", () => {
			orderedListContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		// Setting up image thumbnail
		orderedListThumbnail.classList.add("material-icons")
		orderedListThumbnail.innerHTML = "format_list_bulleted"
		orderedListThumbnail.style.fontSize = "30px"
		orderedListThumbnail.style.padding = "3px"
		orderedListThumbnail.style.maxHeight = "36px"
		orderedListThumbnail.style.color = "#275C8C"

		// Adding the thumbnail to the container
		orderedListContainer.appendChild(orderedListThumbnail)
		return orderedListContainer
	}

	let createNumberedListSelection = (callbackNumberedListToggle) => {
		let numberedListContainer = document.createElement("div")
		let numberedListThumbnail = document.createElement("span")

		// Setting up IDs
		numberedListContainer.id = "italic-container"

		// Setting up container
		numberedListContainer.style.maxHeight = "36px"
		numberedListContainer.style.cursor = "pointer"
		numberedListContainer.style.userSelect = "none"
		numberedListContainer.addEventListener("mousedown", () => {
			numberedListContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackNumberedListToggle === undefined) {
				return
			}
			callbackNumberedListToggle("Toggled")
		})

		numberedListContainer.addEventListener("mouseup", () => {
			numberedListContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		// Setting up image thumbnail
		numberedListThumbnail.classList.add("material-icons")
		numberedListThumbnail.innerHTML = "format_list_numbered"
		numberedListThumbnail.style.fontSize = "30px"
		numberedListThumbnail.style.padding = "3px"
		numberedListThumbnail.style.maxHeight = "36px"
		numberedListThumbnail.style.color = "#275C8C"

		// Adding the thumbnail to the container
		numberedListContainer.appendChild(numberedListThumbnail)
		return numberedListContainer
	}

	let createIndentSelection = (callbackAddIndentChange, callbackRemoveIndentChange) => {
		let indentContainer = document.createElement("div")
		let indentThumbnailContainer = document.createElement("div")
		let indentThumbnailArrow = document.createElement("div")
		let indentContent = document.createElement("div")

		// Creating the thumbnails for the functions
		let indentRightThumbnail = document.createElement("span")
		let indentLeftThumbnail = document.createElement("span")

		// Setting up the IDs
		indentContainer.id = "indent-container"
		indentThumbnailContainer.id = "indent-thumbnail-container"
		indentContent.id = "indent-content"

		// Setting up the indent right thumbnail image
		indentRightThumbnail.classList.add("material-icons")
		indentRightThumbnail.innerHTML = "format_indent_increase"
		indentRightThumbnail.style.fontSize = "26px"
		indentRightThumbnail.style.padding = "5px"
		indentRightThumbnail.style.maxHeight = "36px"
		indentRightThumbnail.style.color = "#275C8C"
		indentLeftThumbnail.classList.add("material-icons")
		indentLeftThumbnail.innerHTML = "format_indent_decrease"
		indentLeftThumbnail.style.fontSize = "26px"
		indentLeftThumbnail.style.padding = "5px"
		indentLeftThumbnail.style.maxHeight = "36px"
		indentLeftThumbnail.style.color = "#275C8C"

		// Setting up the indent left thumbnail image
		indentContainer.style.display = "inline-flex"
		indentContainer.style.flexDirection = "column"
		indentContainer.style.flexWrap = "wrap"
		indentContainer.style.maxHeight = "36px"
		indentContainer.style.userSelect = "none"

		// Setting up the thumbnail container
		indentThumbnailContainer.style.display = "inline-flex"
		indentThumbnailContainer.style.width = "58px"
		indentThumbnailContainer.style.maxHeight = "36px"
		indentThumbnailContainer.style.flexWrap = "wrap"
		indentThumbnailContainer.style.justifyContent = "center"
		indentThumbnailContainer.style.alignItems = "center"
		indentThumbnailContainer.style.flexDirection = "row"
		indentThumbnailContainer.style.cursor = "pointer"
		indentThumbnailContainer.style.border = "1px solid transparent"
		indentThumbnailContainer.style.borderColor = "transparent transparent"

		let openIndentDropdown = () => {
			indentDropdownToggled = true
			indentContent.style.display = "inline-flex"
			indentThumbnailArrow.style.borderColor = "transparent transparent #275C8C transparent"
			indentThumbnailArrow.style.margin = "10px 0px 0px 0px"
		}

		let closeIndentDropdown = () => {
			indentDropdownToggled = false
			indentContent.style.display = "none"
			indentThumbnailArrow.style.borderColor = "#275C8C transparent transparent transparent"
			indentThumbnailArrow.style.margin = "15px 0px 0px 0px"
		}

		window.openIndentDropdown = openIndentDropdown
		window.closeIndentDropdown = closeIndentDropdown

		indentThumbnailContainer.addEventListener("click", () => {
			indentDropdownToggled = !indentDropdownToggled
			if (indentDropdownToggled) {
				window.openIndentDropdown()
				return
			}
			window.closeIndentDropdown()
		})

		// Setting up the thumbnail arrow
		indentThumbnailArrow.style.content = ""
		indentThumbnailArrow.style.width = "0"
		indentThumbnailArrow.style.height = "0"
		indentThumbnailArrow.style.border = "5px solid transparent"
		indentThumbnailArrow.style.borderColor = "#275C8C transparent transparent transparent"
		indentThumbnailArrow.style.margin = "15px 0px 0px 0px"

		// Setting up the content arrow
		indentContent.style.backgroundColor = "white"
		indentContent.style.position = "absolute"
		indentContent.style.marginTop = "36px"
		indentContent.style.width = "58px"
		indentContent.style.display = "none"
		indentContent.style.padding = "6px 0"
		indentContent.style.borderRadius = "5px"
		indentContent.style.border = "1px solid"
		indentContent.style.borderColor = "rgba(0, 0, 0, 0.1)"
		indentContent.style.boxShadow = "20px 20px 50px lightgray"
		indentContent.style.flexWrap = "wrap"
		indentContent.style.flexDirection = "column"
		indentContent.style.alignItems = "center"

		// Adding the content to the thumbnail container
		indentThumbnailContainer.appendChild(indentRightThumbnail.cloneNode(true))
		indentThumbnailContainer.appendChild(indentThumbnailArrow)

		// Adding the options the the content of the dropdown
		indentContent.appendChild(createIndentElementForContent("indent-right-container", indentRightThumbnail.cloneNode(true), indentContent, indentThumbnailArrow, callbackAddIndentChange))
		indentContent.appendChild(createIndentElementForContent("indent-left-container", indentLeftThumbnail.cloneNode(true), indentContent, indentThumbnailArrow, callbackRemoveIndentChange))

		// Creating the main structure of the functionnality
		indentContainer.appendChild(indentThumbnailContainer)
		indentContainer.appendChild(indentContent)

		return indentContainer
	}

	let createTextAlignementSelection = (callbackTextAlignLeftChange, callbackTextAlignCenterChange, callbackTextAlignRightChange) => {
		let textAlignContainer = document.createElement("div")
		let textAlignThumbnailContainer = document.createElement("div")
		let textAlignThumbnailArrow = document.createElement("div")
		let textAlignContent = document.createElement("div")

		// Creating the thumbnails for the functions
		let textAlignLeftThumbnail = document.createElement("span")
		let textAlignCenterThumbnail = document.createElement("span")
		let textAlignRightThumbnail = document.createElement("span")

		// Setting up the IDs
		textAlignContainer.id = "text-align-container"
		textAlignThumbnailContainer.id = "text-align-thumbnail-container"
		textAlignContent.id = "text-align-content"

		// Setting up the indent right thumbnail image
		textAlignLeftThumbnail.classList.add("material-icons")
		textAlignLeftThumbnail.innerHTML = "format_align_left"
		textAlignLeftThumbnail.style.fontSize = "26px"
		textAlignLeftThumbnail.style.padding = "5px"
		textAlignLeftThumbnail.style.maxHeight = "36px"
		textAlignLeftThumbnail.style.color = "#275C8C"
		textAlignCenterThumbnail.classList.add("material-icons")
		textAlignCenterThumbnail.innerHTML = "format_align_center"
		textAlignCenterThumbnail.style.fontSize = "26px"
		textAlignCenterThumbnail.style.padding = "5px"
		textAlignCenterThumbnail.style.maxHeight = "36px"
		textAlignCenterThumbnail.style.color = "#275C8C"
		textAlignRightThumbnail.classList.add("material-icons")
		textAlignRightThumbnail.innerHTML = "format_align_right"
		textAlignRightThumbnail.style.fontSize = "26px"
		textAlignRightThumbnail.style.padding = "5px"
		textAlignRightThumbnail.style.maxHeight = "36px"
		textAlignRightThumbnail.style.color = "#275C8C"

		// Setting up the indent left thumbnail image
		textAlignContainer.style.display = "inline-flex"
		textAlignContainer.style.flexDirection = "column"
		textAlignContainer.style.flexWrap = "wrap"
		textAlignContainer.style.maxHeight = "36px"
		textAlignContainer.style.userSelect = "none"

		// Setting up the thumbnail container
		textAlignThumbnailContainer.style.display = "inline-flex"
		textAlignThumbnailContainer.style.width = "58px"
		textAlignThumbnailContainer.style.maxHeight = "36px"
		textAlignThumbnailContainer.style.flexWrap = "wrap"
		textAlignThumbnailContainer.style.flexDirection = "row"
		textAlignThumbnailContainer.style.justifyContent = "center"
		textAlignThumbnailContainer.style.alignItems = "center"
		textAlignThumbnailContainer.style.cursor = "pointer"
		textAlignThumbnailContainer.style.border = "1px solid transparent"
		textAlignThumbnailContainer.style.borderColor = "transparent transparent"

		let openTextAlignDropdown = () => {
			textAlignDropdownToggled = true
			textAlignContent.style.display = "inline-flex"
			textAlignThumbnailArrow.style.borderColor = "transparent transparent #275C8C transparent"
			textAlignThumbnailArrow.style.margin = "10px 0px 0px 0px"
		}

		let closeTextAlignDropdown = () => {
			textAlignDropdownToggled = false
			textAlignContent.style.display = "none"
			textAlignThumbnailArrow.style.borderColor = "#275C8C transparent transparent transparent"
			textAlignThumbnailArrow.style.margin = "15px 0px 0px 0px"
		}

		window.openTextAlignDropdown = openTextAlignDropdown
		window.closeTextAlignDropdown = closeTextAlignDropdown

		textAlignThumbnailContainer.addEventListener("click", () => {
			textAlignDropdownToggled = !textAlignDropdownToggled
			if (textAlignDropdownToggled) {
				window.openTextAlignDropdown()
				return
			}
			window.closeTextAlignDropdown()
		})

		// Setting up the thumbnail arrow
		textAlignThumbnailArrow.style.content = ""
		textAlignThumbnailArrow.style.width = "0"
		textAlignThumbnailArrow.style.height = "0"
		textAlignThumbnailArrow.style.border = "5px solid transparent"
		textAlignThumbnailArrow.style.borderColor = "#275C8C transparent transparent transparent"
		textAlignThumbnailArrow.style.margin = "15px 0px 0px 0px"

		// Setting up the content arrow
		textAlignContent.style.backgroundColor = "white"
		textAlignContent.style.position = "absolute"
		textAlignContent.style.marginTop = "36px"
		textAlignContent.style.width = "58px"
		textAlignContent.style.display = "none"
		textAlignContent.style.padding = "6px 0"
		textAlignContent.style.borderRadius = "5px"
		textAlignContent.style.border = "1px solid"
		textAlignContent.style.borderColor = "rgba(0, 0, 0, 0.1)"
		textAlignContent.style.boxShadow = "20px 20px 50px lightgray"
		textAlignContent.style.flexWrap = "wrap"
		textAlignContent.style.flexDirection = "column"
		textAlignContent.style.alignItems = "center"

		// Adding the content to the thumbnail container
		textAlignThumbnailContainer.appendChild(textAlignLeftThumbnail.cloneNode(true))
		textAlignThumbnailContainer.appendChild(textAlignThumbnailArrow)

		// Adding the options the the content of the dropdown
		textAlignContent.appendChild(createTextAlignElementForContent("text-align-left-container", textAlignLeftThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignLeftChange))
		textAlignContent.appendChild(createTextAlignElementForContent("text-align-center-container", textAlignCenterThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignCenterChange))
		textAlignContent.appendChild(createTextAlignElementForContent("text-align-right-container", textAlignRightThumbnail.cloneNode(true), textAlignContent, textAlignThumbnailArrow, callbackTextAlignRightChange))

		// Creating the main structure of the functionnality
		textAlignContainer.appendChild(textAlignThumbnailContainer)
		textAlignContainer.appendChild(textAlignContent)

		return textAlignContainer
	}

	let createImageSelection = (callbackImageSelected) => {
		let imageSelectionContainer = document.createElement("div")
		let imageSelectionThumbnail = document.createElement("span")
		let imageSelectionInput = document.createElement("input")

		imageSelectionContainer.id = "image-selection-container"

		imageSelectionContainer.style.maxHeight = "36px"
		imageSelectionContainer.style.cursor = "pointer"
		imageSelectionContainer.style.userSelect = "none"
		imageSelectionContainer.addEventListener("click", () => {
			imageSelectionInput.click()
		})

		imageSelectionThumbnail.classList.add("material-icons")
		imageSelectionThumbnail.innerHTML = "insert_photo"
		imageSelectionThumbnail.style.fontSize = "26px"
		imageSelectionThumbnail.style.padding = "5px"
		imageSelectionThumbnail.style.maxHeight = "36px"
		imageSelectionThumbnail.style.color = "#275C8C"

		imageSelectionInput.style.display = "none"
		imageSelectionInput.type = "file"
		imageSelectionInput.addEventListener("change", (event) => {
			if (event.target.files && event.target.files[0] && event.target.files[0].type && event.target.files[0].type.includes("image")) {
				let reader = new FileReader()
				reader.onload = (file) => {
					if (callbackImageSelected === undefined) {
						return
					}
					callbackImageSelected(file.target.result)
				}
				reader.readAsDataURL(event.target.files[0])
			}
			event.target.value = ""
		})

		imageSelectionContainer.appendChild(imageSelectionThumbnail)
		imageSelectionContainer.appendChild(imageSelectionInput)

		return imageSelectionContainer
	}

	let createUndoSelection = (callbackUndoChange) => {
		let undoSelectionContainer = document.createElement("div")
		let undoSelectionThumbnail = document.createElement("span")

		undoSelectionContainer.id = "image-selection-container"

		undoSelectionContainer.style.maxHeight = "36px"
		undoSelectionContainer.style.cursor = "pointer"
		undoSelectionContainer.style.userSelect = "none"
		undoSelectionContainer.addEventListener("mousedown", () => {
			undoSelectionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackUndoChange === undefined) {
				return
			}
			callbackUndoChange("Toggled")
		})

		undoSelectionContainer.addEventListener("mouseup", () => {
			undoSelectionContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		undoSelectionThumbnail.classList.add("material-icons")
		undoSelectionThumbnail.innerHTML = "undo"
		undoSelectionThumbnail.style.fontSize = "30px"
		undoSelectionThumbnail.style.padding = "3px"
		undoSelectionThumbnail.style.maxHeight = "36px"
		undoSelectionThumbnail.style.color = "#275C8C"

		undoSelectionContainer.appendChild(undoSelectionThumbnail)

		return undoSelectionContainer
	}

	let createRedoSelection = (callbackRedoChange) => {
		let redoSelectionContainer = document.createElement("div")
		let redoSelectionThumbnail = document.createElement("span")

		redoSelectionContainer.id = "image-selection-container"

		redoSelectionContainer.style.maxHeight = "36px"
		redoSelectionContainer.style.cursor = "pointer"
		redoSelectionContainer.style.userSelect = "none"
		redoSelectionContainer.addEventListener("mousedown", () => {
			redoSelectionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
			if (callbackRedoChange === undefined) {
				return
			}
			callbackRedoChange("Toggled")
		})

		redoSelectionContainer.addEventListener("mouseup", () => {
			redoSelectionContainer.style.backgroundColor = "rgba(0, 0, 0, 0)"
		})

		redoSelectionThumbnail.classList.add("material-icons")
		redoSelectionThumbnail.innerHTML = "redo"
		redoSelectionThumbnail.style.fontSize = "30px"
		redoSelectionThumbnail.style.padding = "3px"
		redoSelectionThumbnail.style.maxHeight = "36px"
		redoSelectionThumbnail.style.color = "#275C8C"

		redoSelectionContainer.appendChild(redoSelectionThumbnail)

		return redoSelectionContainer
	}

	let addContentState = () => {
		let content = document.querySelector("#html-content-editor")
		let pTags = document.querySelectorAll("#html-content-editor p")
		pTags.forEach((p) => {
			p.style.borderBottom = "none"
		})
		if (contentIndex === undefined || contentIndex === contentState.length - 1) {
			contentState.push({
				content: content.cloneNode(true),
				layoutOptionToggled: layoutOptionToggled,
			})
		} else {
			let newContentState = contentState.filter((content, index) => {
				return index <= contentIndex
			})
			newContentState.push({
				content: content.cloneNode(true),
				layoutOptionToggled: layoutOptionToggled,
			})
			contentState = newContentState
		}
		contentIndex = contentState.length - 1
	}

	let goBackInContentState = () => {
		let content = document.querySelector("#html-content-editor")
		if (contentIndex > 0) {
			while (content.firstChild) {
				content.removeChild(content.lastChild)
			}
			for (let i = 0; i < contentState[contentIndex - 1].content.children.length; i++) {
				content.appendChild(contentState[contentIndex - 1].content.children[i].cloneNode(true))
			}
			layoutOptionToggled = contentState[contentIndex - 1].layoutOptionToggled
			contentIndex = contentIndex - 1
		}
		let pTags = document.querySelectorAll("#html-content-editor p")
		pTags.forEach((p) => {
			p.addEventListener("focusin", () => {
				p.style.borderBottom = "1px solid rgb(39, 92, 140)"
			})
			p.addEventListener("focusout", () => {
				p.style.borderBottom = "none"
			})
		})
	}

	let rollbackInContentState = () => {
		let content = document.querySelector("#html-content-editor")
		if (contentIndex < contentState.length - 1) {
			while (content.firstChild) {
				content.removeChild(content.lastChild)
			}
			for (let i = 0; i < contentState[contentIndex + 1].content.children.length; i++) {
				content.appendChild(contentState[contentIndex + 1].content.children[i].cloneNode(true))
			}
			layoutOptionToggled = contentState[contentIndex + 1].layoutOptionToggled
			contentIndex = contentIndex + 1
		}
		let pTags = document.querySelectorAll("#html-content-editor p")
		pTags.forEach((p) => {
			p.addEventListener("focusin", () => {
				p.style.borderBottom = "1px solid rgb(39, 92, 140)"
			})
			p.addEventListener("focusout", () => {
				p.style.borderBottom = "none"
			})
		})
	}

	let placeCaretAtEnd = (content) => {
		if (content === undefined || content === null) {
			return
		}
		content.focus()
		if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
			let range = document.createRange()
			if (content.lastChild !== undefined && content.lastChild !== null) {
				let text = content.lastChild
				while (text.tagName !== undefined) {
					if (text.lastChild !== null) {
						text = text.lastChild
					} else {
						break
					}
				}
				if (text.tagName === undefined) {
					range.setStart(text, text.textContent.length)
				} else {
					range.selectNode(text)
				}
			} else {
				range.selectNode(content)
			}
			range.collapse(false)
			let sel = window.getSelection()
			sel.removeAllRanges()
			sel.addRange(range)
		} else if (typeof document.body.createTextRange != "undefined") {
			let textRange = document.body.createTextRange()
			textRange.moveToElementText(content)
			textRange.collapse(false)
			textRange.select()
		}
		selection = {
			ActiveElements: [content],
			HasSelection: false,
			StartOffset: content.textContent.length,
			EndOffset: content.textContent.length,
		}
	}

	let setCaretPosition = (element, caretPos) => {
		if (element != null && element != undefined) {
			if (element.createTextRange) {
				let range = element.createTextRange()
				range.move("character", caretPos)
				range.select()
			} else {
				if (element.selectionStart) {
					element.focus()
					element.setSelectionRange(caretPos, caretPos)
				} else element.focus()
			}
		}
	}

	let truncateSelection = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		if (!selection.HasSelection) {
			let loneElement = selection.ActiveElements[0]
			if (loneElement.tagName === "P") {
				loneElement = loneElement.lastChild
				let textContent = loneElement.textContent
				let newElement = document.createElement("somum-custom-style")
				newElement.innerHTML = textContent.split(" ").join("&nbsp;")
				loneElement.textContent = ""
				loneElement.innerHTML = ""
				loneElement.appendChild(newElement)
				return [newElement]
			} else if (loneElement.tagName === "SOMUM-CUSTOM-STYLE") {
				let container = loneElement
				while (container.tagName !== "P") {
					container = container.parentElement
				}
				if (container.lastChild === loneElement && selection.StartOffset === loneElement.textContent.length) {
					let newElement = loneElement.cloneNode(true)
					newElement.textContent = ""
					newElement.innerHTML = ""
					container.appendChild(newElement)
					return [newElement]
				}
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
			if (selection.EndOffset < element.textContent.length) {
				lastTextElement = element.textContent.substring(selection.EndOffset, element.textContent.length)
			}
			selectedTextElement = element.textContent.substring(selection.StartOffset, selection.EndOffset)
			if (selectedTextElement !== undefined && selectedTextElement.length > 0) {
				let selectedElement = document.createElement("somum-custom-style")
				if (element.tagName === "P") {
					return undefined
				} else if (element.tagName === "SOMUM-CUSTOM-STYLE") {
					selectedElement = element
					selectedElement.textContent = selectedTextElement
					selectedElement.innerHTML = selectedTextElement.split(" ").join("&nbsp;")
					if (firstTextElement !== undefined && firstTextElement.length > 0) {
						let firstElement = selectedElement.cloneNode(true)
						firstElement.textContent = firstTextElement
						firstElement.innerHTML = firstTextElement.split(" ").join("&nbsp;")
						selectedElement.parentElement.insertBefore(firstElement, selectedElement)
					}
					if (lastTextElement !== undefined && lastTextElement.length > 0) {
						let lastElement = selectedElement.cloneNode(true)
						lastElement.textContent = lastTextElement
						lastElement.innerHTML = lastTextElement.split(" ").join("&nbsp;")
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
				notSelectedElement.innerHTML = notSelectedText.split(" ").join("&nbsp;")
				firstElement.parentElement.insertBefore(notSelectedElement, firstElement)
			}
			if (selection.EndOffset < lastElement.textContent.length && lastElement.textContent.length > 0) {
				let notSelectedText = lastElement.textContent.substring(selection.EndOffset, lastElement.textContent.length)
				let notSelectedElement = lastElement.cloneNode(true)
				notSelectedElement.textContent = notSelectedText
				notSelectedElement.innerHTML = notSelectedText.split(" ").join("&nbsp;")
				if (lastElement.nextSibling !== undefined && lastElement.nextSibling !== null) {
					lastElement.parentElement.insertBefore(notSelectedElement, lastElement.nextSibling)
				} else {
					lastElement.parentElement.appendChild(notSelectedElement)
				}
			}
			firstElement.textContent = firstSelectedText
			firstElement.innerHTML = firstSelectedText.split(" ").join("&nbsp;")

			lastElement.textContent = lastSelectedText
			lastElement.innerHTML = lastSelectedText.split(" ").join("&nbsp;")
			return selection.ActiveElements
		}
	}

	// Callback functions
	let policeChangeCallback = (police) => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			element.style.fontFamily = police
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeSizeChangeCallback = (size) => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			element.style.fontSize = size
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeColorChangeCallback = (color) => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			element.style.color = color
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeBoldToggleCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			if (element.style.fontWeight === "bold") {
				element.style.fontWeight = "normal"
				return
			}
			element.style.fontWeight = "bold"
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeItalicToggleCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			if (element.style.fontStyle === "italic") {
				element.style.fontStyle = "normal"
				return
			}
			element.style.fontStyle = "italic"
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeUnderlineToggleCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let elementsToChange = truncateSelection()
		if (elementsToChange === undefined || elementsToChange.length <= 0) {
			return
		}
		elementsToChange.forEach((element) => {
			if (element.style.textDecoration === "underline") {
				element.style.textDecoration = "none"
				return
			}
			element.style.textDecoration = "underline"
		})
		placeCaretAtEnd(elementsToChange.pop())
		addContentState()
	}

	let policeTextAlignementLeftCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let isParentNumberedList = container.parentElement.getAttribute("isnumberedlist") === null ? false : true
		let isParentOrderedList = container.parentElement.getAttribute("isorderedlist") === null ? false : true
		if (isParentOrderedList || isParentNumberedList) {
			container.style.paddingLeft = ""
		}
		container.style.textAlign = "left"
		container.style.justifyContent = "flex-start"
		placeCaretAtEnd(container.lastChild)
		addContentState()
	}

	let policeTextAlignementCenterCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let isParentNumberedList = container.parentElement.getAttribute("isnumberedlist") === null ? false : true
		let isParentOrderedList = container.parentElement.getAttribute("isorderedlist") === null ? false : true
		if (isParentOrderedList || isParentNumberedList) {
			container.style.paddingLeft = ""
		}
		container.style.textAlign = "center"
		container.style.justifyContent = "center"
		placeCaretAtEnd(container.lastChild)
		addContentState()
	}

	let policeTextAlignementRightCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let isParentNumberedList = container.parentElement.getAttribute("isnumberedlist") === null ? false : true
		let isParentOrderedList = container.parentElement.getAttribute("isorderedlist") === null ? false : true
		if (isParentOrderedList || isParentNumberedList) {
			container.style.paddingLeft = ""
		}
		container.style.textAlign = "right"
		container.style.justifyContent = "flex-end"
		placeCaretAtEnd(container.lastChild)
		addContentState()
	}

	let policeAddIndentCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		let sizeIndent = parseInt(indentSize.replace("px", ""))
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let firstElement = container.firstChild
		let currentIndent = firstElement.style.marginLeft.replace("px", "")
		if (currentIndent === "") {
			firstElement.style.marginLeft = indentSize
			return
		}
		let currentIndentSize = parseInt(currentIndent) + sizeIndent
		firstElement.style.marginLeft = currentIndentSize + "px"
		placeCaretAtEnd(container.lastChild)
		addContentState()
	}

	let policeRemoveIndentCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		let sizeIndent = parseInt(indentSize.replace("px", ""))
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let firstElement = container.firstChild
		let currentIndent = firstElement.style.marginLeft.replace("px", "")
		let currentIndentSize = parseInt(currentIndent) - sizeIndent
		if (currentIndent !== "" && currentIndentSize > 0) {
			firstElement.style.marginLeft = currentIndentSize + "px"
			addContentState()
			placeCaretAtEnd(container.lastChild)
			return
		}
		firstElement.style.marginLeft = ""
		addContentState()
		placeCaretAtEnd(container.lastChild)
	}

	let policeAddNumberedListCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		let addContainer = false
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		if (container.children[0] !== undefined && container.children.length === 1 && container.children[0].tagName === "BR") {
			container.removeChild(container.children[0])
		} else if (container.children.length > 1 || (container.children.length === 1 && container.children[0].textContent.length > 0)) {
			addContainer = true
		}
		let mainContainer = addContainer ? document.createElement("div") : container.parentElement
		let numberedList = addContainer ? document.createElement("p") : container
		let firstElement = addContainer ? document.createElement("somum-custom-style") : container.firstChild
		let mainContent = document.querySelector("#html-content-editor")
		let itterator = document.createElement("somum-counter")
		let mainContentWidth = parseInt(mainContent.style.width.replace("px", "")) - 21
		numberedList.contentEditable = "true"
		mainContainer.setAttribute("isnumberedlist", "true")
		if (!addContainer) {
			numberedList.removeChild(numberedList.lastChild)
		}
		numberedList.appendChild(itterator)
		if (addContainer) {
			if (container.parentElement.nextSibling !== undefined && container.parentElement.nextSibling !== null) {
				mainContent.insertBefore(mainContainer, container.parentElement.nextSibling)
			} else {
				mainContent.appendChild(mainContainer)
			}
			mainContainer.appendChild(numberedList)
			numberedList.appendChild(firstElement)
		}
		numberedList.appendChild(firstElement)
		numberedList.style.paddingLeft = "15px"
		numberedList.setAttribute("counter", "1")
		itterator.contentEditable = "false"
		itterator.innerHTML = "1.&nbsp;"
		mainContainer.style.display = "flex"
		mainContainer.style.flexDirection = "column"
		mainContainer.style.minHeight = "20px"
		mainContainer.style.width = `${mainContentWidth}px`
		mainContainer.style.maxWidth = `${mainContentWidth}px`
		numberedList.style.width = `${mainContentWidth}px`
		numberedList.style.maxWidth = `${mainContentWidth}px`
		numberedList.style.cursor = "text"
		numberedList.style.outline = "none"
		numberedList.style.minHeight = "20px"
		numberedList.addEventListener("focusin", () => {
			numberedList.style.borderBottom = "1px solid rgb(39, 92, 140)"
		})
		numberedList.addEventListener("focusout", () => {
			numberedList.style.borderBottom = "none"
		})
		addContentState()
	}

	let policeAddOrderedListCallback = () => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		let addContainer = false
		while (container.tagName !== "P") {
			container = container.parentElement
		}
		if (container.children[0] !== undefined && container.children.length === 1 && container.children[0].tagName === "BR") {
			container.removeChild(container.children[0])
		} else if (container.children.length > 1 || (container.children.length === 1 && container.children[0].textContent.length > 0)) {
			addContainer = true
		}
		let mainContainer = addContainer ? document.createElement("div") : container.parentElement
		let orderedList = addContainer ? document.createElement("p") : container
		let firstElement = addContainer ? document.createElement("somum-custom-style") : container.firstChild
		let mainContent = document.querySelector("#html-content-editor")
		let itterator = document.createElement("somum-counter")
		let mainContentWidth = parseInt(mainContent.style.width.replace("px", "")) - 21
		orderedList.contentEditable = "true"
		mainContainer.setAttribute("isorderedlist", "true")
		if (!addContainer) {
			orderedList.removeChild(orderedList.lastChild)
		}
		orderedList.appendChild(itterator)
		if (addContainer) {
			if (container.parentElement.nextSibling !== undefined && container.parentElement.nextSibling !== null) {
				mainContent.insertBefore(mainContainer, container.parentElement.nextSibling)
			} else {
				mainContent.appendChild(mainContainer)
			}
			mainContainer.appendChild(orderedList)
			orderedList.appendChild(firstElement)
		}
		orderedList.appendChild(firstElement)
		orderedList.style.paddingLeft = "15px"
		itterator.contentEditable = "false"
		itterator.innerHTML = "&bull;&nbsp;"
		mainContainer.style.display = "flex"
		mainContainer.style.flexDirection = "column"
		mainContainer.style.minHeight = "20px"
		mainContainer.style.width = `${mainContentWidth}px`
		mainContainer.style.maxWidth = `${mainContentWidth}px`
		orderedList.style.width = `${mainContentWidth}px`
		orderedList.style.maxWidth = `${mainContentWidth}px`
		orderedList.style.cursor = "text"
		orderedList.style.outline = "none"
		orderedList.style.minHeight = "20px"
		orderedList.addEventListener("focusin", () => {
			orderedList.style.borderBottom = "1px solid rgb(39, 92, 140)"
		})
		orderedList.addEventListener("focusout", () => {
			orderedList.style.borderBottom = "none"
		})
		addContentState()
	}

	let addImageCallback = (image) => {
		if (selection === undefined || selection.ActiveElements === undefined || selection.ActiveElements.length <= 0) {
			return
		}
		let container = selection.ActiveElements[0]
		let addContainer = false

		while (container.tagName !== "P") {
			container = container.parentElement
		}
		let isOnlySpace = container.children[0].textContent.replace(/\s/g, "").length < 1
		if (container.children[0] !== undefined && container.children.length === 1 && container.children[0].tagName === "BR") {
			container.removeChild(container.children[0])
		} else if (container.children.length > 1 || (container.children.length === 1 && container.children[0].textContent.length > 0 && !isOnlySpace)) {
			addContainer = true
		}
		if (isOnlySpace) {
			container.children[0].textContent = ""
		}
		let mainContent = document.querySelector("#html-content-editor")
		let mainContentWidth = parseInt(mainContent.style.width.replace("px", "")) - 21
		let imageContainer = addContainer ? document.createElement("div") : container.parentElement
		let mainContainer = addContainer ? document.createElement("p") : container
		let firstContent = document.createElement("somum-custom-style")
		let imageToAdd = document.createElement("img")
		if (addContainer) {
			if (container.parentElement.nextSibling !== undefined && container.parentElement.nextSibling !== null) {
				mainContent.insertBefore(imageContainer, container.parentElement.nextSibling)
			} else {
				mainContent.appendChild(imageContainer)
			}
			imageContainer.appendChild(mainContainer)
		} else {
			mainContainer.removeChild(mainContainer.firstChild)
		}
		mainContainer.appendChild(firstContent)
		imageContainer.style.display = "flex"
		imageContainer.style.flexWrap = "wrap"
		mainContainer.contentEditable = "true"
		mainContainer.style.display = ""
		imageContainer.style.width = `${mainContentWidth}px`
		imageContainer.style.maxWidth = `${mainContentWidth}px`
		imageContainer.setAttribute("isimagecontainer", "true")
		imageToAdd.src = image
		imageToAdd.style.maxWidth = `${mainContentWidth / 2}px`
		imageToAdd.onload = () => {
			imageContainer.style.minHeight = `${imageToAdd.height + 5}px`
		}
		firstContent.appendChild(imageToAdd)
		addContentState()
	}

	let initializeContentInTextMode = (container, mainContainer) => {
		let firstContainer = document.createElement("div")
		let firstParagraph = document.createElement("p")
		let firstStyle = document.createElement("somum-custom-style")
		let containerWidth = parseInt(mainContainer.style.width.replace("px", "")) - 21
		firstContainer.style.display = "flex"
		firstContainer.style.flexDirection = "column"
		firstContainer.style.minHeight = "20px"
		firstContainer.style.maxWidth = `${containerWidth}px`
		firstContainer.style.width = `${containerWidth}px`

		firstParagraph.contentEditable = "true"
		firstParagraph.style.width = firstContainer.style.width
		firstParagraph.style.maxWidth = firstContainer.style.width
		firstParagraph.style.minHeight = "20px"
		firstParagraph.style.cursor = "text"
		firstParagraph.style.outline = "none"
		firstParagraph.addEventListener("focusin", () => {
			firstParagraph.style.borderBottom = "1px solid rgb(39, 92, 140)"
		})
		firstParagraph.addEventListener("focusout", () => {
			firstParagraph.style.borderBottom = "none"
		})

		firstStyle.style.minHeight = "20px"

		firstContainer.appendChild(firstParagraph)
		firstParagraph.appendChild(firstStyle)
		container.appendChild(firstContainer)
	}

	let initializeContentInLayoutMode = (container) => {
		let mainContainer = document.createElement("div")
		let header = document.createElement("div")
		let body = document.createElement("div")
		let footer = document.createElement("div")
		initializeContentInTextMode(header, container)
		initializeContentInTextMode(body, container)
		initializeContentInTextMode(footer, container)
		mainContainer.appendChild(header)
		mainContainer.appendChild(body)
		mainContainer.appendChild(footer)
		container.appendChild(mainContainer)
		header.addEventListener("mouseover", () => {
			layoutSelected = header
		})
		body.addEventListener("mouseover", () => {
			layoutSelected = body
		})
		footer.addEventListener("mouseover", () => {
			layoutSelected = footer
		})
		mainContainer.addEventListener("mouseout", () => {
			layoutSelected = undefined
		})
		header.style.backgroundColor = "#d3d3d3"
		body.style.backgroundColor = "#e8e8e8"
		footer.style.backgroundColor = "#d3d3d3"
	}

	// Initialization function
	let initialize = () => {
		let head = document.getElementsByTagName("HEAD")[0]
		let style = document.createElement("style")
		let googleMaterial = document.createElement("link")
		let robotoFont = document.createElement("link")
		let root = document.querySelector("#" + mainRoot)
		let toolbar = document.createElement("div")
		let policeModificationContainer = document.createElement("div")
		let imageOptionsContainer = document.createElement("div")
		let actionRevokersContainer = document.createElement("div")
		let content = document.createElement("div")
		let policeSelection, sizeSelection, colorSelection, boldSelection, italicSelection, underlineSelection, textAlignmentSelection, indentSelection, numberedListSelection, orderedListSelection, imageSelection, undoSelection, redoSelection, morePoliceOptionsSelection, layoutOption
		screenWidth = window.screen.width
		style.type = "text/css"
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
        div[isnumberedlist=\'true\'] { 
            counter-reset: item
        }
        div[isOrderedList=\'true\'] p:before { 
            content: counter(item) + ". "
        }
        input,
        textarea,
        div[contenteditable=\'true\'] {
            -webkit-user-select: text;
            user-select: text;
        }
        #{mainRoot} * {
            box-sizing: border-box;
        }`
		googleMaterial.rel = "stylesheet"
		googleMaterial.type = "text/css"
		googleMaterial.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
		robotoFont.rel = "stylesheet"
		robotoFont.type = "text/css"
		robotoFont.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"

		head.appendChild(googleMaterial)
		head.appendChild(robotoFont)
		head.appendChild(style)

		toolbar.id = "toolbar"
		policeModificationContainer.id = "police-modification-container"
		imageOptionsContainer.id = "image-options-container"
		actionRevokersContainer.id = "action-revokers-container"
		content.id = "html-content-editor"

		root.style.width = "auto"
		root.style.height = "auto"

		toolbar.style.display = "inline-flex"
		toolbar.style.flexWrap = "wrap"
		toolbar.style.marginBottom = "10px"

		policeModificationContainer.style.display = "inline-flex"
		policeModificationContainer.style.flexWrap = "wrap"
		policeModificationContainer.style.border = "1px solid"
		policeModificationContainer.style.borderColor = "rgba(0, 0, 0, 0.1)"
		policeModificationContainer.style.marginRight = "0.3em"
		policeModificationContainer.style.backgroundColor = "white"

		imageOptionsContainer.style.display = "inline-flex"
		imageOptionsContainer.style.flexWrap = "wrap"
		imageOptionsContainer.style.border = "1px solid"
		imageOptionsContainer.style.borderColor = "rgba(0, 0, 0, 0.1)"
		imageOptionsContainer.style.marginRight = "0.3em"
		imageOptionsContainer.style.backgroundColor = "white"

		actionRevokersContainer.style.display = "inline-flex"
		actionRevokersContainer.style.flexWrap = "wrap"
		actionRevokersContainer.style.border = "1px solid"
		actionRevokersContainer.style.borderColor = "rgba(0, 0, 0, 0.1)"
		actionRevokersContainer.style.backgroundColor = "white"

		content.style.height = mainRootHeight
		content.style.maxHeight = mainRootHeight
		content.style.margin = "0"
		content.style.padding = "5px"
		content.style.overflowY = "auto"
		content.style.outline = "none"
		content.style.border = "3px solid"
		content.style.borderRadius = "5px"
		content.style.borderColor = "#275C8C"
		content.style.backgroundColor = "white"
		content.style.width = "631px"
		content.style.display = "flex"
		content.style.flexWrap = "nowrap"
		content.style.flexDirection = "column"
		content.style.justifyContent = "flex-start"
		content.style.alignItems = "center"

		document.addEventListener("selectionchange", () => {
			let activeSelection = document.getSelection()
			if (toolbar.contains(activeSelection.anchorNode) || activeSelection.anchorNode === undefined || activeSelection.anchorNode === null || selectionAlreadyChanged) {
				selectionAlreadyChanged = false
				return
			}
			if (activeSelection.type === "Caret") {
				let activeTag = activeSelection.anchorNode
				if (activeSelection.anchorNode.tagName === undefined && activeSelection.anchorNode.parentElement.tagName === "SOMUM-CUSTOM-STYLE") {
					activeTag = activeSelection.anchorNode.parentNode
				} else if (activeSelection.anchorNode.tagName === "P") {
					activeTag = activeSelection.anchorNode.lastChild
				}
				if (activeTag !== undefined && activeTag !== null && activeTag.tagName === "SOMUM-CUSTOM-STYLE") {
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
			if (firstNode === secondNode && activeSelection.anchorNode === activeSelection.focusNode && firstNode.tagName === "SOMUM-CUSTOM-STYLE") {
				selection = {
					ActiveElements: [firstNode],
					HasSelection: true,
					StartOffset: activeSelection.anchorOffset < activeSelection.focusOffset ? activeSelection.anchorOffset : activeSelection.focusOffset,
					EndOffset: activeSelection.anchorOffset < activeSelection.focusOffset ? activeSelection.focusOffset : activeSelection.anchorOffset,
				}
				return
			}
			let container = firstNode.parentElement
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
			let lastElement = firstNodeIndex < secondNodeIndex ? secondNode : firstNode
			let lastElementFound = false
			let startOffset
			let endOffset
			for (let i = startPoint; i <= endPoint; i++) {
				if (container.children[i].tagName === "SOMUM-CUSTOM-STYLE") {
					listOfElements.push(container.children[i])
				}
				if (container.children[i].tagName !== "SOMUM-CUSTOM-STYLE" && i === startPoint) {
					startOffset = 0
				}
				if (container.children[i].tagName !== "SOMUM-CUSTOM-STYLE" && i === endPoint) {
					endOffset = container.children[i - 1].textContent.length
				}
			}
			startOffset = startOffset !== undefined ? startOffset : firstNodeIndex < secondNodeIndex ? activeSelection.anchorOffset : activeSelection.focusOffset
			endOffset = endOffset !== undefined ? endOffset : firstNodeIndex < secondNodeIndex ? activeSelection.focusOffset : activeSelection.anchorOffset
			if (listOfElements.length <= 0) {
				return
			}
			selection = {
				ActiveElements: listOfElements,
				HasSelection: true,
				StartOffset: startOffset,
				EndOffset: endOffset,
			}
			return
		})

		content.addEventListener("keydown", (event) => {
			let activeSelection = window.getSelection()
			let activeElement = activeSelection.anchorNode
			let newValue = event.key
			if (activeElement === undefined || activeElement === null) {
				return
			}
			if (activeElement.tagName === undefined) {
				activeElement = activeElement.parentElement
			}
			if (activeElement.tagName === "P") {
				activeElement = activeElement.lastChild
				placeCaretAtEnd(activeElement)
			}
			let container = activeElement
			while (container.tagName !== "P") {
				container = container.parentElement
			}
			let isParentNumberedList = container.parentElement.getAttribute("isnumberedlist") === null ? false : true
			let isParentOrderedList = container.parentElement.getAttribute("isorderedlist") === null ? false : true
			let isParentImageContainer = container.parentElement.getAttribute("isimagecontainer") === null ? false : true
			if (newValue.length === 1 && !isParentImageContainer && !event.ctrlKey) {
				if (activeElement.tagName === "P" && activeElement.children.length > 0 && activeElement.lastChild.tagName === "SOMUM-CUSTOM-STYLE") {
					event.preventDefault()
					activeElement.lastChild.textContent = activeElement.lastChild.textContent + newValue.split(" ").join("&nbsp;")
					placeCaretAtEnd(activeElement.lastChild)
					addContentState()
				} else if (activeElement.tagName === "P" && (activeElement.children.length <= 0 || (activeElement.children[0] !== undefined && activeElement.children[0].tagName === "BR"))) {
					event.preventDefault()
					if (activeElement.children[0] !== undefined) {
						activeElement.removeChild(activeElement.children[0])
					}
					let firstElement = document.createElement("somum-custom-style")
					firstElement.style.minHeight = "20px"
					firstElement.textContent = newValue.split(" ").join(" ")
					firstElement.innerHTML = newValue.split(" ").join("&nbsp;")
					activeElement.appendChild(firstElement)
					placeCaretAtEnd(firstElement)
					addContentState()
				} else if (activeElement.tagName === "SOMUM-CUSTOM-STYLE" && activeElement.textContent.length <= 0 && activeElement.innerHTML.length <= 0) {
					event.preventDefault()
					activeElement.textContent = newValue.split(" ").join(" ")
					activeElement.innerHTML = newValue.split(" ").join("&nbsp;")
					placeCaretAtEnd(activeElement)
				}
			} else if (newValue == "Delete") {
				if (isParentImageContainer) {
					let image = container.getElementsByTagName("img")[0]
					if (image === undefined || image === null) {
						event.preventDefault()
						return
					}
					let imageContainer = image.parentElement
					if (imageContainer.textContent.length > 0) {
						return
					}
					event.preventDefault()
					imageContainer.removeChild(image)
					container.parentElement.removeAttribute("isimagecontainer")
					container.parentElement.style.minHeight = "20px"
					placeCaretAtEnd(imageContainer)
				}
			} else if (newValue === "Backspace") {
				if (activeElement.tagName === "SOMUM-CUSTOM-STYLE") {
					if (activeSelection.type === "Caret") {
						if (!isParentImageContainer && !isParentNumberedList && !isParentOrderedList) {
							if (activeElement.parentElement.children.length === 1 && activeElement.textContent.length === 1) {
								event.preventDefault()
								activeElement.textContent = ""
								placeCaretAtEnd(activeElement)
							} else if (activeElement.parentElement.children.length === 1 && activeElement.textContent.length <= 0) {
								event.preventDefault()
								let container = activeElement.parentElement.parentElement
								let mainContainer = container.parentElement
								if (mainContainer.children.length <= 1) {
									return
								}
								let containerSibling = container.previousSibling
								mainContainer.removeChild(container)
								placeCaretAtEnd(containerSibling.lastChild)
							}
						} else if (isParentImageContainer) {
							let image = container.getElementsByTagName("img")[0]
							if (image === undefined || image === null) {
								event.preventDefault()
								return
							}
							let imageContainer = image.parentElement
							if (imageContainer.textContent.length > 0) {
								return
							}
							event.preventDefault()
							imageContainer.removeChild(image)
							container.parentElement.removeAttribute("isimagecontainer")
							container.parentElement.style.minHeight = "20px"
							placeCaretAtEnd(imageContainer)
						} else if (isParentNumberedList || isParentOrderedList) {
							let mainStructure = container.parentElement.parentElement
							if (container.lastChild.tagName === "SOMUM-CUSTOM-STYLE" && container.lastChild.textContent.length <= 0 && container.children.length === 2) {
								event.preventDefault()
								if (isParentNumberedList) {
									let actualCount = parseInt(container.getAttribute("counter"))
									let elementCountBuffer
									for (let i = actualCount - 1; i < container.parentElement.children.length; i++) {
										elementCountBuffer = parseInt(container.parentElement.children[i].getAttribute("counter"))
										--elementCountBuffer
										container.parentElement.children[i].firstChild.textContent = `${elementCountBuffer}. `
										container.parentElement.children[i].firstChild.innerHTML = `${elementCountBuffer}.&nbsp;`
										container.parentElement.children[i].setAttribute("counter", elementCountBuffer)
									}
								}
								if (container.previousSibling !== undefined && container.previousSibling !== null) {
									placeCaretAtEnd(container.previousSibling)
								} else if (container.nextSibling !== undefined && container.nextSibling !== null) {
									placeCaretAtEnd(container.nextSibling)
								}
								if (mainStructure.children.length >= 1 && container.parentElement.children.length > 1) {
									if (container.parentElement.lastChild === container) {
										let mainContainer = container.parentElement
										let mainContainerSibling = mainContainer.nextSibling
										let newMainContainer = document.createElement("div")
										let newContainer = document.createElement("p")
										let newElement = document.createElement("somum-custom-style")
										let containerWidth = parseInt(content.style.width.replace("px", "")) - 21
										newMainContainer.style.display = "flex"
										newMainContainer.style.flexDirection = "column"
										newMainContainer.style.minHeight = "20px"
										newMainContainer.style.maxWidth = `${containerWidth}px`
										newMainContainer.style.width = `${containerWidth}px`

										newContainer.contentEditable = "true"
										newContainer.style.width = newMainContainer.style.width
										newContainer.style.maxWidth = newMainContainer.style.width
										newContainer.style.minHeight = "20px"
										newContainer.style.cursor = "text"
										newContainer.style.outline = "none"
										newContainer.addEventListener("focusin", () => {
											newContainer.style.borderBottom = "1px solid rgb(39, 92, 140)"
										})
										newContainer.addEventListener("focusout", () => {
											newContainer.style.borderBottom = "none"
										})

										newElement.style.minHeight = "20px"
										newContainer.appendChild(newElement)
										newMainContainer.appendChild(newContainer)
										if (mainContainerSibling !== undefined && mainContainerSibling !== null) {
											mainStructure.insertBefore(newMainContainer, mainContainerSibling)
										} else {
											mainStructure.appendChild(newMainContainer)
										}
										placeCaretAtEnd(newElement)
									}
									container.parentElement.removeChild(container)
								} else if ((mainStructure.children.length === 1 && container.parentElement.children.length === 1) || (mainStructure.children.length > 1 && container.parentElement.children.length === 1)) {
									container.parentElement.removeAttribute("isnumberedlist")
									container.parentElement.removeAttribute("isorderedlist")
									container.removeAttribute("counter")
									container.removeChild(container.firstChild)
									container.style.paddingLeft = "0"
									placeCaretAtEnd(container.firstChild)
								}
							} else if (container.lastChild.tagName === "SOMUM-CUSTOM-STYLE" && container.lastChild.textContent.length === 1 && container.children.length === 2) {
								event.preventDefault()
								container.lastChild.textContent = ""
								placeCaretAtEnd(container.lastChild)
							}
						}
					} else {
						if (!isParentImageContainer) {
							event.preventDefault()
							if (selection.ActiveElements.length <= 0) {
								return
							}
							if (selection.ActiveElements.length > 1) {
								let remainingText = selection.ActiveElements[0].textContent.substring(0, selection.StartOffset)
								if (remainingText.length <= 0) {
									selection.ActiveElements[0].parentElement.removeChild(selection.ActiveElements[0])
								}
								selection.ActiveElements[0].textContent = remainingText
								selection.ActiveElements[0].innerHTML = remainingText.split(" ").join("&nbsp;")
								remainingText = selection.ActiveElements[selection.ActiveElements.length - 1].textContent.substring(selection.EndOffset, selection.ActiveElements[selection.ActiveElements.length - 1].textContent.length)
								if (remainingText.length <= 0) {
									selection.ActiveElements[selection.ActiveElements.length - 1].parentElement.removeChild(selection.ActiveElements[selection.ActiveElements.length - 1])
								}
								selection.ActiveElements[selection.ActiveElements.length - 1].textContent = remainingText
								selection.ActiveElements[selection.ActiveElements.length - 1].textContent = remainingText.split(" ").join("&nbsp;")
								for (let i = 1; i < selection.ActiveElements.length - 1; i++) {
									selection.ActiveElements[i].parentElement.removeChild(selection.ActiveElements[i])
								}
							} else {
								let firstPart = selection.ActiveElements[0].textContent.substring(0, selection.StartOffset)
								let lastPart = selection.ActiveElements[0].textContent.substring(selection.EndOffset, selection.ActiveElements[0].textContent.length)
								let remainingText = firstPart + lastPart
								if (remainingText.length <= 0) {
									selection.ActiveElements[0].parentElement.removeChild(selection.ActiveElements[0])
								}
								selection.ActiveElements[0].textContent = remainingText
								selection.ActiveElements[0].innerHTML = remainingText.split(" ").join("&nbsp;")
							}

							if (container.children.length <= 0 || ((isParentNumberedList || isParentOrderedList) && container.children.length === 1)) {
								let newStyle = document.createElement("somum-custom-style")
								newStyle.style.minHeight = "20px"
								container.appendChild(newStyle)
								placeCaretAtEnd(newStyle)
							} else {
								placeCaretAtEnd(selection.ActiveElements[0])
							}
						} else if (isParentImageContainer) {
							let image = container.getElementsByTagName("img")[0]
							if (image === undefined || image === null) {
								event.preventDefault()
								return
							}
							let imageContainer = image.parentElement
							if (imageContainer.textContent.length > 0) {
								return
							}
							event.preventDefault()
							imageContainer.removeChild(image)
							container.parentElement.removeAttribute("isimagecontainer")
							container.parentElement.style.minHeight = "20px"
							placeCaretAtEnd(imageContainer)
						}
					}
				} else {
					event.preventDefault()
				}
			} else if (newValue === "Enter") {
				event.preventDefault()
				let mainContainer = container.parentElement
				let mainStructure = mainContainer.parentElement
				if (!isParentNumberedList && !isParentOrderedList) {
					let mainContainerSibling = mainContainer.nextSibling
					let newMainContainer = document.createElement("div")
					let newContainer = document.createElement("p")
					let newElement = document.createElement("somum-custom-style")
					let containerWidth = parseInt(content.style.width.replace("px", "")) - 21
					let elementsToAdd = []
					let activeSelection = window.getSelection()
					let setCaretAtBegining = false
					if (selection.HasSelection === false && (selection.StartOffset !== selection.ActiveElements[0].textContent.length || selection.ActiveElements[0].parentElement.lastChild !== selection.ActiveElements[0]) && !isParentImageContainer) {
						setCaretAtBegining = true
						let textToAdd = selection.ActiveElements[0].textContent
						let container = selection.ActiveElements[0].parentElement
						let actualElement = selection.ActiveElements[0]
						textToAdd = textToAdd.substring(selection.StartOffset, selection.ActiveElements[0].textContent.length)
						newElement = selection.ActiveElements[0].cloneNode(true)
						newElement.textContent = textToAdd
						newElement.innerHTML = textToAdd.split(" ").join("&nbps;")
						selection.ActiveElements[0].textContent = selection.ActiveElements[0].textContent.substring(0, selection.StartOffset)
						selection.ActiveElements[0].innerHTML = selection.ActiveElements[0].textContent.substring(0, selection.StartOffset).split(" ").join("&nbsp;")
						while (actualElement !== container.lastChild) {
							actualElement = actualElement.nextElementSibling
							elementsToAdd.push(actualElement)
						}
					}
					newMainContainer.style.display = "flex"
					newMainContainer.style.flexDirection = "column"
					newMainContainer.style.minHeight = "20px"
					newMainContainer.style.maxWidth = `${containerWidth}px`
					newMainContainer.style.width = `${containerWidth}px`

					newContainer.contentEditable = "true"
					newContainer.style.width = newMainContainer.style.width
					newContainer.style.maxWidth = newMainContainer.style.width
					newContainer.style.minHeight = "20px"
					newContainer.style.cursor = "text"
					newContainer.style.outline = "none"
					newContainer.addEventListener("focusin", () => {
						newContainer.style.borderBottom = "1px solid rgb(39, 92, 140)"
					})
					newContainer.addEventListener("focusout", () => {
						newContainer.style.borderBottom = "none"
					})

					newElement.style.minHeight = "20px"
					newContainer.appendChild(newElement)
					if (elementsToAdd.length > 0) {
						elementsToAdd.forEach((element) => {
							newContainer.appendChild(element)
						})
					}
					newMainContainer.appendChild(newContainer)
					if (mainContainerSibling !== undefined && mainContainerSibling !== null) {
						mainStructure.insertBefore(newMainContainer, mainContainerSibling)
					} else {
						mainStructure.appendChild(newMainContainer)
					}
					placeCaretAtEnd(newContainer.lastChild)
				} else if (isParentNumberedList || isParentOrderedList) {
					if (container.lastChild.tagName === "SOMUM-CUSTOM-STYLE" && container.lastChild.textContent.length <= 0 && container.children.length === 2) {
						if (isParentNumberedList) {
							let actualCount = parseInt(container.getAttribute("counter"))
							let elementCountBuffer
							if (actualCount > 1) {
								for (let i = actualCount - 1; i < container.parentElement.children.length; i++) {
									elementCountBuffer = parseInt(container.parentElement.children[i].getAttribute("counter"))
									--elementCountBuffer
									container.parentElement.children[i].firstChild.textContent = `${elementCountBuffer}. `
									container.parentElement.children[i].firstChild.innerHTML = `${elementCountBuffer}.&nbsp;`
									container.parentElement.children[i].setAttribute("counter", elementCountBuffer)
								}
							}
						}
						if (container.previousSibling !== undefined && container.previousSibling !== null) {
							placeCaretAtEnd(container.previousSibling)
						} else if (container.nextSibling !== undefined && container.nextSibling !== null) {
							placeCaretAtEnd(container.nextSibling)
						} else if (container.parentElement.previousSibling !== undefined && container.parentElement.previousSibling !== null) {
							placeCaretAtEnd(container.parentElement.previousSibling)
						} else if (container.parentElement.nextElementSibling !== undefined && container.parentElement.nextElementSibling !== null) {
							placeCaretAtEnd(container.parentElement.nextElementSibling)
						}
						if (content.children.length >= 1 && container.parentElement.children.length > 1) {
							if (container.parentElement.lastChild === container) {
								let mainContainer = container.parentElement
								let mainStructure = mainContainer.parentElement
								let mainContainerSibling = mainContainer.nextSibling
								let newMainContainer = document.createElement("div")
								let newContainer = document.createElement("p")
								let newElement = document.createElement("somum-custom-style")
								let containerWidth = parseInt(content.style.width.replace("px", "")) - 21
								newMainContainer.style.display = "flex"
								newMainContainer.style.flexDirection = "column"
								newMainContainer.style.minHeight = "20px"
								newMainContainer.style.maxWidth = `${containerWidth}px`
								newMainContainer.style.width = `${containerWidth}px`

								newContainer.contentEditable = "true"
								newContainer.style.width = newMainContainer.style.width
								newContainer.style.maxWidth = newMainContainer.style.width
								newContainer.style.minHeight = "20px"
								newContainer.style.cursor = "text"
								newContainer.style.outline = "none"
								newContainer.addEventListener("focusin", () => {
									newContainer.style.borderBottom = "1px solid rgb(39, 92, 140)"
								})
								newContainer.addEventListener("focusout", () => {
									newContainer.style.borderBottom = "none"
								})

								newElement.style.minHeight = "20px"
								newContainer.appendChild(newElement)
								newMainContainer.appendChild(newContainer)
								if (mainContainerSibling !== undefined && mainContainerSibling !== null) {
									mainStructure.insertBefore(newMainContainer, mainContainerSibling)
								} else {
									mainStructure.appendChild(newMainContainer)
								}
								placeCaretAtEnd(newElement)
							}
							container.parentElement.removeChild(container)
						} else if (mainStructure.children.length > 1 && container.parentElement.children.length === 1) {
							mainStructure.removeChild(container.parentElement)
						} else if (mainStructure.children.length === 1 && container.parentElement.children.length === 1) {
							container.parentElement.removeAttribute("isnumberedlist")
							container.parentElement.removeAttribute("isorderedlist")
							container.removeAttribute("counter")
							container.removeChild(container.firstChild)
							container.style.paddingLeft = "0"
							placeCaretAtEnd(container.firstChild)
						}
					} else if ((container.lastChild.tagName === "SOMUM-CUSTOM-STYLE" && container.lastChild.textContent.length > 0 && container.children.length === 2) || (container.lastChild.tagName === "SOMUM-CUSTOM-STYLE" && container.children.length > 2)) {
						let newContainer = document.createElement("p")
						let newCounter = document.createElement("somum-counter")
						let newStyle = document.createElement("somum-custom-style")

						let mainContentWidth = parseInt(content.style.width.replace("px", "")) - 21
						if (isParentNumberedList) {
							let actualCount = parseInt(container.getAttribute("counter"))
							newContainer.setAttribute("counter", actualCount + 1)
							newCounter.innerHTML = `${actualCount + 1}.&nbsp;`
							++actualCount
							let elementCountBuffer
							for (let i = actualCount - 1; i < container.parentElement.children.length; i++) {
								elementCountBuffer = parseInt(container.parentElement.children[i].getAttribute("counter"))
								++elementCountBuffer
								container.parentElement.children[i].firstChild.textContent = `${elementCountBuffer}. `
								container.parentElement.children[i].firstChild.innerHTML = `${elementCountBuffer}.&nbsp;`
								container.parentElement.children[i].setAttribute("counter", elementCountBuffer)
							}
						} else {
							newCounter.innerHTML = "&bull;&nbsp;"
						}
						newContainer.contentEditable = "true"
						newContainer.appendChild(newCounter)
						newContainer.appendChild(newStyle)
						newContainer.style.paddingLeft = "15px"
						newCounter.contentEditable = "false"
						newContainer.style.width = `${mainContentWidth}px`
						newContainer.style.maxWidth = `${mainContentWidth}px`
						newContainer.style.cursor = "text"
						newContainer.style.outline = "none"
						newContainer.style.minHeight = "20px"
						newContainer.addEventListener("focusin", () => {
							newContainer.style.borderBottom = "1px solid rgb(39, 92, 140)"
						})
						newContainer.addEventListener("focusout", () => {
							newContainer.style.borderBottom = "none"
						})
						newStyle.style.minHeight = "20px"

						if (container.nextSibling !== undefined && container.nextSibling !== null) {
							container.parentElement.insertBefore(newContainer, container.nextSibling)
						} else {
							container.parentElement.appendChild(newContainer)
						}
						placeCaretAtEnd(newStyle)
					}
				}
			} else if (newValue.length === 1 && isParentImageContainer) {
				event.preventDefault()
			}
		})

		content.addEventListener("contextmenu", (event) => {
			event.preventDefault()
			console.log(event)
			if (layoutOption !== undefined) {
				document.getElementsByTagName("body")[0].removeChild(layoutOption)
			}
			layoutOption = createRightClickMenu(
				event.clientX,
				event.clientY,
				() => {
					if (layoutOption !== undefined) {
						document.getElementsByTagName("body")[0].removeChild(layoutOption)
					}
					layoutOption = undefined
					content.innerHTML = ""
					if (layoutOptionToggled) {
						initializeContentInLayoutMode(content)
					} else {
						initializeContentInTextMode(content, content)
					}
					addContentState()
				},
				(color, selectedLayout) => {
					if (layoutOption !== undefined) {
						document.getElementsByTagName("body")[0].removeChild(layoutOption)
					}
					layoutOption = undefined
					selectedLayout.style.backgroundColor = color
					addContentState()
				},
				() => {
					if (layoutOption !== undefined) {
						document.getElementsByTagName("body")[0].removeChild(layoutOption)
					}
					layoutOption = undefined
				}
			)
			document.getElementsByTagName("body")[0].appendChild(layoutOption)
		})

		content.addEventListener("input", () => {
			addContentState()
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
			let morePoliceOptionsContainer = document.createElement("div")
			let morePoliceOptionsThumbnail = document.createElement("span")
			let morePoliceOptionsDropdown = document.createElement("div")

			morePoliceOptionsContainer.style.display = "inline-flex"
			morePoliceOptionsContainer.style.flexWrap = "wrap"
			morePoliceOptionsContainer.style.flexDirection = "column"
			morePoliceOptionsContainer.style.userSelect = "none"

			morePoliceOptionsThumbnail.classList.add("material-icons")
			morePoliceOptionsThumbnail.innerHTML = "more_horiz"
			morePoliceOptionsThumbnail.style.padding = "5px"
			morePoliceOptionsThumbnail.style.fontSize = "26px"
			morePoliceOptionsThumbnail.style.color = "#275C8C"

			let openMorePoliceOptionsDropdown = () => {
				morePoliceDropdownToggled = true
				morePoliceOptionsDropdown.style.display = "inline-flex"
			}

			let closeMorePoliceOptionsDropdown = () => {
				morePoliceDropdownToggled = false
				morePoliceOptionsDropdown.style.display = "none"
			}

			window.openMorePoliceOptionsDropdown = openMorePoliceOptionsDropdown
			window.closeMorePoliceOptionsDropdown = closeMorePoliceOptionsDropdown
			morePoliceOptionsThumbnail.addEventListener("click", () => {
				morePoliceDropdownToggled = !morePoliceDropdownToggled
				if (morePoliceDropdownToggled) {
					window.openMorePoliceOptionsDropdown()
					return
				}
				window.closeMorePoliceOptionsDropdown()
			})

			morePoliceOptionsDropdown.style.position = "absolute"
			morePoliceOptionsDropdown.style.marginTop = "34px"
			morePoliceOptionsDropdown.style.padding = "6px 0px"
			morePoliceOptionsDropdown.style.borderRadius = "5px"
			morePoliceOptionsDropdown.style.border = "1px solid rgba(0, 0, 0, 0.1)"
			morePoliceOptionsDropdown.style.boxShadow = "lightgray 20px 20px 50px"
			morePoliceOptionsDropdown.style.flexWrap = "wrap"
			morePoliceOptionsDropdown.style.flexDirection = "column"
			morePoliceOptionsDropdown.style.alignItems = "center"
			morePoliceOptionsDropdown.style.backgroundColor = "white"
			morePoliceOptionsDropdown.style.display = "none"

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

			content.style.width = "290px"
			content.style.maxWidth = "290px"
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
			if (layoutOption !== undefined && !layoutOption.contains(event.target)) {
				document.getElementsByTagName("body")[0].removeChild(layoutOption)
				layoutOption = undefined
			}
			for (let i = 0; i < content.children.length; i++) {
				if (content.children[i].contains(event.target)) {
					childSelected = true
					break
				}
			}
			if (!childSelected && content.contains(event.target)) {
				selectionAlreadyChanged = true
				if (layoutOptionToggled) {
					placeCaretAtEnd(content.lastChild.lastChild.lastChild.lastChild)
					selection = {
						ActiveElements: [content.lastChild.lastChild.lastChild.lastChild],
						HasSelection: false,
						StartOffset: content.lastChild.lastChild.lastChild.lastChild.textContent.length,
						EndOffset: content.lastChild.lastChild.lastChild.lastChild.textContent.length,
					}
				} else {
					placeCaretAtEnd(content.lastChild.lastChild.lastChild)
					selection = {
						ActiveElements: [content.lastChild.lastChild.lastChild],
						HasSelection: false,
						StartOffset: content.lastChild.lastChild.lastChild.textContent.length,
						EndOffset: content.lastChild.lastChild.lastChild.textContent.length,
					}
				}
			}
		}

		root.appendChild(toolbar)
		root.appendChild(content)

		initializeContentInTextMode(content, content)

		contentState.push({
			content: content.cloneNode(true),
			layoutOptionToggled: layoutOptionToggled,
		})

		if (!window.onresize) {
			window.onresize = () => {
				if ((window.screen.width < 680 && latestScreenWidth >= 680) || (window.screen.width >= 680 && latestScreenWidth < 680)) {
					root.innerHTML = ""
					initialize()
				}
			}
		}
		if (!window.getFinalMarkup) {
			window.getFinalMarkup = () => {
				let container = content.cloneNode(true)
				let pTags = container.querySelectorAll("p")
				pTags.forEach((p) => {
					p.contentEditable = "false"
					p.style.borderBottom = "none"
					p.style.cursor = ""
					p.style.width = "100%"
					p.style.maxWidth = "100%"
					p.parentElement.style.width = "100%"
					p.parentElement.style.maxWidth = "100%"
				})
				return container.innerHTML
			}
		}
		if (!window.getMarkupForEmail) {
			window.getMarkupForEmail = () => {
				let container = document.getElementById("html-content-editor").cloneNode(true)
				let wrapper = document.createElement("table")
				let body = wrapper.createTBody()
				// border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"
				wrapper.style.border = "0"
				wrapper.cellPadding = "0"
				wrapper.cellSpacing = "0"
				//wrapper.setAttribute('layoutMode', layoutOptionToggled)
				if (!layoutOptionToggled) {
					for (let k = 0; k < container.children.length; k++) {
						let isContainerNumberedList = container.children[k].getAttribute("isnumberedlist")
						let isContainerOrderedList = container.children[k].getAttribute("isorderedlist")
						let isContainerImageContainer = container.children[k].getAttribute("isimagecontainer")
						if (isContainerNumberedList !== null && isContainerNumberedList !== undefined) {
							isContainerNumberedList = isContainerNumberedList === "true" ? true : false
						} else {
							isContainerNumberedList = undefined
						}
						if (isContainerOrderedList !== null && isContainerOrderedList !== undefined) {
							isContainerOrderedList = isContainerOrderedList === "true" ? true : false
						} else {
							isContainerOrderedList = undefined
						}
						if (isContainerImageContainer !== null && isContainerImageContainer !== undefined) {
							isContainerImageContainer = isContainerImageContainer === "true" ? true : false
						} else {
							isContainerImageContainer = undefined
						}
						for (let i = 0; i < container.children[k].children.length; i++) {
							let newContainer = body.insertRow()
							let newCell = newContainer.insertCell()
							if (isContainerImageContainer) {
								newContainer.setAttribute("isimagecontainer", "true")
							}
							if (isContainerNumberedList) {
								newContainer.setAttribute("isnumberedlist", "true")
							}
							if (isContainerOrderedList) {
								newContainer.setAttribute("isorderedlist", "true")
							}
							newContainer.style.width = "100%"
							newContainer.style.minHeight = "20px"
							newCell.style.cssText = container.children[k].children[i].style.cssText
							newCell.style.display = ""
							newCell.style.justifyContent = ""
							newCell.style.flexDirection = ""
							newCell.style.textAlign = container.children[k].children[i].style.justifyContent === "flex-start" ? "left" : container.children[k].children[i].style.justifyContent === "flex-end" ? "right" : container.children[k].children[i].style.justifyContent === "center" ? "center" : ""
							for (let j = 0; j < container.children[k].children[i].children.length; j++) {
								let newStyle = document.createElement("span")
								newStyle.style.cssText = container.children[k].children[i].children[j].style.cssText
								newStyle.innerHTML = container.children[k].children[i].children[j].innerHTML
								newCell.appendChild(newStyle)
							}
						}
					}
				} else {
					for (let l = 0; l < container.firstChild.children.length; l++) {
						let backgroundColor = container.firstChild.children[l].style.backgroundColor
						for (let k = 0; k < container.firstChild.children[l].children.length; k++) {
							let isContainerNumberedList = container.firstChild.children[l].children[k].getAttribute("isnumberedlist")
							let isContainerOrderedList = container.firstChild.children[l].children[k].getAttribute("isorderedlist")
							let isContainerImageContainer = container.firstChild.children[l].children[k].getAttribute("isimagecontainer")
							if (isContainerNumberedList !== null && isContainerNumberedList !== undefined) {
								isContainerNumberedList = isContainerNumberedList === "true" ? true : false
							} else {
								isContainerNumberedList = undefined
							}
							if (isContainerOrderedList !== null && isContainerOrderedList !== undefined) {
								isContainerOrderedList = isContainerOrderedList === "true" ? true : false
							} else {
								isContainerOrderedList = undefined
							}
							if (isContainerImageContainer !== null && isContainerImageContainer !== undefined) {
								isContainerImageContainer = isContainerImageContainer === "true" ? true : false
							} else {
								isContainerImageContainer = undefined
							}
							for (let i = 0; i < container.firstChild.children[l].children[k].children.length; i++) {
								let newContainer = body.insertRow()
								let newCell = newContainer.insertCell()
								if (isContainerImageContainer) {
									newContainer.setAttribute("isimagecontainer", "true")
								}
								if (isContainerNumberedList) {
									newContainer.setAttribute("isnumberedlist", "true")
								}
								if (isContainerOrderedList) {
									newContainer.setAttribute("isorderedlist", "true")
								}
								newContainer.setAttribute("layoutid", l + 1)
								newContainer.style.width = "100%"
								newContainer.style.minHeight = "20px"
								newContainer.style.backgroundColor = backgroundColor
								newCell.style.cssText = container.firstChild.children[l].children[k].children[i].style.cssText
								newCell.style.display = ""
								newCell.style.justifyContent = ""
								newCell.style.flexDirection = ""
								newCell.style.textAlign = container.firstChild.children[l].children[k].children[i].style.justifyContent === "flex-start" ? "left" : container.firstChild.children[l].children[k].children[i].style.justifyContent === "flex-end" ? "right" : container.firstChild.children[l].children[k].children[i].style.justifyContent === "center" ? "center" : ""
								for (let j = 0; j < container.firstChild.children[l].children[k].children[i].children.length; j++) {
									let newStyle = document.createElement("span")
									newStyle.style.cssText = container.firstChild.children[l].children[k].children[i].children[j].style.cssText
									newStyle.innerHTML = container.firstChild.children[l].children[k].children[i].children[j].innerHTML
									newCell.appendChild(newStyle)
								}
							}
						}
					}
				}
				return wrapper.outerHTML
			}
		}
		if (!window.instanciateEditor) {
			window.instanciateEditor = () => {
				root.innerHTML = ""
				initialize()
				return "Editor Initialized"
			}
		}
		latestScreenWidth = window.screen.width
		placeCaretAtEnd(content.lastChild.lastChild.lastChild)
	}

	initialize()
})
