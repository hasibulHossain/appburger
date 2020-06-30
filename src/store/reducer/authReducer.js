import * as actionTypes from '../actions/actionTypes';
const initialState = {
   token: null,
   userId: null,
   expiresIn: null,
   loading: false,
   error: false,
   errorCode: null,
   errorMessage: null,
   unexpectedError: false
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_INIT:
         return {
            ...state,
            loading: true
         }

      case actionTypes.AUTH_SUCCESS:
         return {
            ...state,
            token: action.payload.idToken,
            userId: action.payload.localId,
            expiresIn: action.payload.expiresIn,
            error: false,
            loading: false,
            unexpectedError: false
         }

      case actionTypes.AUTH_FAILED:
         return {
            ...state,
            error: true,
            loading: false,
            errorCode: action.payload.errorCode,
            errorMessage: action.payload.errorMessage
         }

      case actionTypes.LOGIN_EXPIRES:
         return {
            ...state,
            token: null,
            userId: null,
            expiresIn: null,
            error: false,
            errorMessage: null
         }

      case actionTypes.LOGOUT:
         return {
            ...state,
            error: false,
            errorMessage: null,
            token: null,
            userId: null,
            expiresIn: null
         }

      case actionTypes.AUTH_UNEXPECTED_ERROR:
         return {
            ...state,
            unexpectedError: true,
            errorMessage: 'Please turn on Internet to continue.'
         }
         
      default:
         return state
   }
}

export default authReducer;