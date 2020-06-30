import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ingredientsReducer from '../src/store/reducer/ingredientsReducer';
import authReducer from '../src/store/reducer/authReducer';
import ordersReducer from '../src/store/reducer/ordersReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const logger = store => {
  return next => {
    return action => {
      // console.log('indexJs 17: [Middleware] Dispatching', action)
      const result = next(action)
      // console.log('indexJs 19: [Middleware] next state', store.getState())
      return result
    }
  }
}

//custom combine reducer technique
// const rootReducers = (state = {}, action) => {
//   const languageCodes = state.languages.map(language => language.code);
//   return {
//     languages: languages(state.languages, action),
//     // merge languageCodes with original action object, now you have access in translations reducer
//     translations: translations(state.translations, {...action, languageCodes})
//   };
// };

const rootReducer = combineReducers({
  ingsRTR: ingredientsReducer,
  authRTR: authReducer,
  ordersRTR: ordersReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
