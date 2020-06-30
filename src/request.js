const baseUrl = 'https://appburger-3993e.firebaseio.com'

const postOrder = async (data, token) => {
    const init = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    const response = await fetch(`${baseUrl}/order.json?auth=${token}`, init);
    
    if(response.ok) {
      const data = await response.json();
      return data
    }
}

const getIngredients = async () => {
  const response = await fetch(`${baseUrl}/ingredients.json`)
  if(response.ok) {
    const data = await response.json()
    return data
  }
}

export { postOrder, getIngredients }