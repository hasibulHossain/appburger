import * as actionTypes from './actionTypes';

import { verifyUser } from '../../HTTP/fetch-auth';

const authInit = () => {
   return {
      type: actionTypes.AUTH_INIT
   }
}

const authSuccess = (idToken, localId, expiresIn) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
         idToken: idToken,
         localId: localId,
         expiresIn: expiresIn
      }
   }
}

const authFailed = (errorCode, errorMessage) => {
   return {
      type: actionTypes.AUTH_FAILED,
      payload: {
         errorCode: errorCode,
         errorMessage: errorMessage
      }
   }
}

const authUnexpectedError = () => {
   return {
      type: actionTypes.AUTH_UNEXPECTED_ERROR
   }
}

const loginExpire = () => {
   localStorage.clear()
   return {
      type: actionTypes.LOGIN_EXPIRES
   }
}

export const logout = () => {
   localStorage.clear()
   return {
      type: actionTypes.LOGOUT
   }
}

const logoutUser = expiresIn => {
   return dispatch => {
      setTimeout(() => {
         dispatch(loginExpire())
      }, expiresIn * 1000); //convert 3600S into millisecond
   }
}

export const auth = (email, password, signUp) => {
   return dispatch => {
      dispatch(authInit())
      const userData = {
         email: email,
         password: password,
         returnSecureToken: true
      }

      verifyUser(userData, signUp)
         .then(data => {
            const expireTime = new Date().getTime() + (data.expiresIn * 1000)
            localStorage.setItem('authData', JSON.stringify({token: data.idToken, userId: data.localId, expireTime: expireTime}))
            dispatch(authSuccess(data.idToken, data.localId, data.expiresIn))
            dispatch(logoutUser(data.expiresIn))
         })
         .catch(err => {
            if(err) {
               const parseError = JSON.parse(err)
               dispatch(authFailed(parseError.error.code, parseError.error.message))
            } else {
               dispatch(authUnexpectedError())
            }
         })
   }
}

export const checkingAuthState = () => {
   return dispatch => {
      const authData = JSON.parse(localStorage.getItem('authData'))
      if(!authData) {
         dispatch(logout())
      } else {
            if(authData.expireTime > new Date().getTime()) {
               dispatch(authSuccess(authData.token, authData.userId, authData.expireTime))
               dispatch(logoutUser((authData.expireTime - new Date().getTime()) / 1000)) // convert millisecond to second
            } else {
               dispatch(logout())
            }
      }
   }
}
 