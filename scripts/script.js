(function () {

    // * UI elements
    const body = document.body
    const header = document.querySelector('.header')
    const headerLinks = document.querySelectorAll('.menu__link')
    const menu = document.querySelector('.menu__body')


    // * menu icon handler
    header.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__icon')) {
            e.target.classList.toggle('menu__icon_active')
            menu.classList.toggle('menu__body_active')
        } else if (e.target.classList.contains('menu__link')) {
            e.preventDefault()
            e.target.classList.add('menu__link_active')
            checkHeaderLinksClass(e.target, headerLinks)
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


    // ! popup windows 
    const cookiePopupData = {
        title: 'Cookies Settings',
        text: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.',
        buttonsText: ['Accept', 'Preferences'],
        controlsText: ['Necessary', 'Statistics', 'Marketing']
    }

    // ! http module
    function http() {
        return {
            get(url, callBack) {
                try {
                    const xhr = new XMLHttpRequest()
                    xhr.open('GET', url)

                    xhr.addEventListener('load', function () {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            callBack(err, xhr.statusText)
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
                            callBack(err, xhr.statusText)
                        }
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


})()