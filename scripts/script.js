(function () {
    // * UI elements
    const body = document.body
    const menuIcon = document.querySelector('.menu__icon')
    const menu = document.querySelector('.menu__body')


    // * menu icon handler
    menuIcon.addEventListener('click', (e) => {
        if (e.target) {
            e.target.classList.toggle('menu__icon_active')
            menu.classList.toggle('menu__body_active')
        }
    })

    // * http module
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