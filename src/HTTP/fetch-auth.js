// export const verifyUser = async (userData, isSignUp) => {
//    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXbeUMGQZa4eiIzPmOxsxSIDk147EsI-Y"

//    if(isSignUp) {
//       url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXbeUMGQZa4eiIzPmOxsxSIDk147EsI-Y"
//    }
//    const init = {
//       method: 'POST',
//       headers: {
//          'content-type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//    }

//    const response = await fetch(url, init)

//    if(response.ok) {
//       const data = await response.json()
//       return data
//    }
//    return response.text().then(text => {
//       // const errorMessage = JSON.parse(text);
//       throw new Error({name: 'hasib', roll: 22})
//    })
// }

export const verifyUser = (userData, isSignUp) => new Promise((resolve, reject) => {
   let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXbeUMGQZa4eiIzPmOxsxSIDk147EsI-Y"

   if(isSignUp) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXbeUMGQZa4eiIzPmOxsxSIDk147EsI-Y"
   }
   const request = new XMLHttpRequest()

   request.addEventListener('readystatechange', (e) => {
       if((e.target.status >= 200 && e.target.status < 300) && e.target.readyState === 4) {
           const data = JSON.parse(e.target.responseText)
           resolve(data)
       } else if(e.target.readyState === 4) {
           reject(e.target.response)
       }
   })

   request.open('POST', url)
   request.send(JSON.stringify(userData))
})