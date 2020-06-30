import * as actionTypes from '../actions/actionTypes';

const initialState = {
   ingredients: null,
   error: false,
   totalPrice: 2
}

const INGREDIENT_PRICE = {
   salad: 1,
   bacon: 0.50,
   meat: 3,
   cheese: 2
}

const ingredientsReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_INGREDIENTS:
         return {
            ...state,
            ingredients: action.payload.ingredients,
            totalPrice: 2,
            error: false
         };

      case actionTypes.FETCHING_INGREDIENTS_FAILED:
         return {
            ...state,
            error: true
         };

      case actionTypes.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.payload.type]: state.ingredients[action.payload.type] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload.type]
         };
         
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.payload.type]: state.ingredients[action.payload.type] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload.type]

         };
   
      default:
         return state
   };
};

export default ingredientsReducer;