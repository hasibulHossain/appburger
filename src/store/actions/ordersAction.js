import * as actionTypes from './actionTypes';
import getOrders from '../../HTTP/fetch-orders'

const requestFetchingOrders = () => {
   return {
      type: actionTypes.REQUEST_FETCHING_ORDERS
   }
}

const fetchingOrdersSuccess = orderData => {
   return {
      type: actionTypes.FETCHING_ORDERS_SUCCESS,
      payload: {
         data: orderData
      }
   }
}

const fetchingOrdersFailed = errorMessage => {
   return {
      type: actionTypes.FETCHING_ORDERS_FAILED,
      payload: {
         errorMessage: errorMessage
      }
   }
}

const fetchingOrdersNetworkError = () => {
   return {
      type: actionTypes.FETCHING_ORDERS_NETWORK_ERROR
   }
}

export const fetchingOrders = (token , userId) => {
   return (dispatch) => {
      dispatch(requestFetchingOrders());

      getOrders(token, userId)
      .then(data => {
         const fetchOrder = [];
         for(const order in data) {
            fetchOrder.push({...data[order], id: order});
         };
         
         dispatch(fetchingOrdersSuccess(fetchOrder));
      })
      .catch(err => {
         if(err) {
            const parseError = JSON.parse(err)
            dispatch(fetchingOrdersFailed(parseError.error))
         } else {
            dispatch(fetchingOrdersNetworkError());
         }
      });
   }
}

export const removeOrdersInLogout = () => {
   return dispatch => {
      dispatch({type: actionTypes.REMOVE_ORDERS_IN_LOGOUT})
   }
}