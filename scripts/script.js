(function () {

    // * UI elements
    const body = document.body
    const page = document.querySelector('.page')
    const header = document.querySelector('.header')
    const headerLinks = document.querySelectorAll('.menu__link')
    const menu = document.querySelector('.menu__body')
    const toTopBtn = document.querySelector('.to-top-btn')
    const cart = document.querySelector('#cart-value')
    const popup = document.querySelector('.popup')
    // * form and forms elements
    const form = document.querySelector('.form')
    const formInputs = form.elements
    const formBtn = document.querySelector('.form__button')


    // ! function calling
    window.addEventListener('scroll', renderToTopBtn, false)
    toTopBtn.addEventListener('click', onToTopBtnClickHandler, false)
    formBtn.addEventListener('click', onSubmitHandler, false)
    document.addEventListener('DOMContentLoaded', () => {
        popup.classList.add('popup_open')
        setBodyScroll(popup)
    })
    popup.addEventListener('click', popupHandler, false)


    // * header handler
    header.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__icon')) {
            e.target.classList.toggle('menu__icon_active')
            menu.classList.toggle('menu__body_active')
            setBodyScroll(menu)
        } else if (e.target.classList.contains('menu__link')) {
            e.target.classList.add('menu__link_active')
            checkHeaderLinksClass(e.target, headerLinks)

            body.querySelector('.menu__icon').classList.remove('menu__icon_active')
            menu.classList.remove('menu__body_active')
        }
    })

    function checkHeaderLinksClass(target, links) {
        const linksArr = [...links]
        linksArr.forEach(link => {
            if (link !== target) {
                link.classList.remove('menu__link_active')
            }
        })
    }

    function setBodyScroll(element) {
        if (element.classList.contains('menu__body_active') || element.classList.contains('popup_open')) {
            body.dataset.bodyScroll = false
        } else {
            body.dataset.bodyScroll = true
        }

    }


    // * to top button functionality
    function renderToTopBtn() {
        if (body.scrollTo > 20 || document.documentElement.scrollTop > 20) {
            toTopBtn.classList.add('to-top-btn_active')
        } else {
            toTopBtn.classList.remove('to-top-btn_active')
        }
    }

    function onToTopBtnClickHandler() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const homeLink = headerLinks[0]
        homeLink.classList.add('menu__link_active')
        checkHeaderLinksClass(homeLink, headerLinks)
    }

    // * form functionality
    function formValues(inputs) {

        const formData = {}
        const inputsArr = Array.from(inputs)

        for (let i = 0; i < inputs.length - 1; i++) {
            formData[inputsArr[i].getAttribute('name')] = inputsArr[i].value
        }

        return formData
    }


    function onSubmitHandler(e) {
        e.preventDefault()
        const formDataObj = formValues(formInputs)
        sendDataRequest(url, formDataObj, { 'Content-type': 'application/json; charset=UTF-8' })
            .then(response => showResponseAlert(null, JSON.parse(response)))
            .catch(error => showResponseAlert(error))
        form.reset()
    }


    // ! http module
    const url = 'https://jsonplaceholder.typicode.com/posts'

    function http() {
        return {
            get(url, callBack) {
                try {
                    const xhr = new XMLHttpRequest()
                    xhr.open('GET', url)

                    xhr.addEventListener('load', function () {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            callBack(xhr.statusText, null)
                        }
                        const response = JSON.parse(xhr.responseText)
                        callBack(null, response)
                    })

                    xhr.send()

                } catch (error) {
                    callBack(error)
                }
            },
            post(url, body, headers, callBack) {
                try {
                    const xhr = new XMLHttpRequest()
                    xhr.open('POST', url)

                    xhr.addEventListener('load', function () {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            callBack(xhr.status, null)
                        }

                        const response = JSON.stringify(xhr.responseText)
                        callBack(null, response)
                    })


                    if (headers) {
                        Object.entries(headers).forEach(([key, value]) => {
                            xhr.setRequestHeader(key, value)
                        })
                    }

                    xhr.send(JSON.stringify(body))

                } catch (error) {
                    callBack(error)
                }
            }
        }
    }

    // * init http module
    const httpModule = http()

    function sendDataRequest(url, dataObject, headers) {
        return new Promise((resolve, reject) => {
            httpModule.post(url, dataObject, headers, (err, response) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(response)
            })
        })
    }


    function showResponseAlert(err, response) {
        if (err) {
            alert(`Error! error status: ${err}`)
        }
        alert(`Server response: ${response}`)
        changeCartValue()
        renderPopupWindow(popupData)
    }

    // * cart functionality
    let cartValue = 0
    cart.textContent = cartValue.toString()

    function changeCartValue() {
        cartValue += 1
        cart.textContent = cartValue.toString()
    }

    // ! popup windows 
    function renderPopupWindow(data) {
        const popupAlert = popupTemplate(data)
        page.insertAdjacentElement('beforeend', popupAlert)
        popupAlert.addEventListener('click', ({ target }) => {
            if (target.tagName === "BUTTON") {
                popupAlert.remove()
            }
        }, false)
    }

    const popupData = {
        title: 'Success!',
        text: 'Your application has been processed, later we will send you a confirmation on your e-mail and mobile number. Thank you for your time! Cleaning X team.',
        buttonText: 'Close',
    }


    function popupTemplate(popupData) {

        const { title, text, buttonText } = popupData

        let popupElements = []

        // * popup 
        const popup = document.createElement('div')
        popup.classList.add('popup')
        popup.classList.add('popup_open')

        // * popup body
        const popupBody = document.createElement('div')
        popupBody.classList.add('popup__body')

        // * popup content
        const popupContent = document.createElement('div')
        popupContent.classList.add('popup__content')

        // * popup elements
        const popupTitle = document.createElement('h1')
        popupTitle.classList.add('popup__title')
        popupTitle.textContent = title
        popupElements.push(popupTitle)

        // * popup elements
        const popupText = document.createElement('div')
        popupText.classList.add('popup__text')
        popupText.textContent = text
        popupElements.push(popupText)

        // * popup button
        const popupButton = document.createElement('button')
        popupButton.classList.add('button')
        popupButton.classList.add('popup__button')
        popupButton.textContent = buttonText
        popupButton.dataset.btnType = 'close'

        // * popup buttons
        const popupButtons = document.createElement('div')
        popupButtons.appendChild(popupButton)
        popupButtons.classList.add('popup__buttons')
        popupElements.push(popupButtons)

        popupElements.forEach(el => {
            popupContent.appendChild(el)
        })

        popupBody.appendChild(popupContent)
        popup.appendChild(popupBody)

        return popup
    }

    function popupHandler({ target }) {
        if (target.dataset.btnType === 'close') {
            popup.remove()
            body.dataset.bodyScroll = true
        } else if (target.dataset.btnType === 'settings') {
            popup.querySelector('.popup__controls').classList.toggle('popup__controls_open')
        }
    }

})()