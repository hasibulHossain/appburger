import * as actionTypes from './actionTypes';
import { getIngredients} from '../../request';

export const addIngredients = type => {
   return {
      type: actionTypes.ADD_INGREDIENT, 
      payload: {
         type: type
      }
   }
}

export const removeIngredients = type => {
   return {
      type: actionTypes.REMOVE_INGREDIENT, 
      payload: {
         type: type
      }
   }
}

const setIngredients = ingredients => {
   return {
      type: actionTypes.SET_INGREDIENTS,
      payload: {
         ingredients: ingredients
      }
   }
}

const fetchingIngredientsFailed = () => {
   return {
      type: actionTypes.FETCHING_INGREDIENTS_FAILED
   }
}

export const  initialIngredients = () => {
   return dispatch => {
         getIngredients().then(data => {
            dispatch(setIngredients(data))
        })
        .catch(err => {
           console.log(err)
           dispatch(fetchingIngredientsFailed())
        })
   }
}