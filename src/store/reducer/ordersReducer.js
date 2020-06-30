import * as actionTypes from '../actions/actionTypes';

const initialState = {
   orders: [],
   loading: false,
   error: false,
   errorMessage: null,
   unexpectedError: false
};

const ordersReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.REQUEST_FETCHING_ORDERS:
         return {
            ...state,
            loading: true
         };

      case actionTypes.FETCHING_ORDERS_SUCCESS:
         return {
            ...state,
            orders: action.payload.data,
            loading: false,
            error: false,
            unexpectedError: false
         };

      case actionTypes.FETCHING_ORDERS_FAILED:
         return {
            ...state,
            orders: [],
            errorMessage: action.payload.errorMessage,
            error: true,
            loading: false
         };

      case actionTypes.REMOVE_ORDERS_IN_LOGOUT:
         return {
            ...state,
            orders: []
         };

      case actionTypes.FETCHING_ORDERS_NETWORK_ERROR:
         return {
            ...state,
            networkError: true,
            loading: false
         };

      default:
         return state;
   };
};

export default ordersReducer;