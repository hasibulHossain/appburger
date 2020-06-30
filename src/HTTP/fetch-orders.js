const getOrders = (token, userId) => new Promise((resolve, reject) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`

    const url = 'https://appburger-3993e.firebaseio.com/order.json' + queryParams
    const request = new XMLHttpRequest()

    request.addEventListener('readystatechange', (e) => {
        if ((e.target.status >= 200 && e.target.status < 300) && e.target.readyState === 4) {
            const data = JSON.parse(e.target.responseText)
            resolve(data)
        } else if (e.target.readyState === 4) {
            reject(e.target.response)
        }
    })

    request.open('GET', url)
    request.send()
})

export default getOrders;