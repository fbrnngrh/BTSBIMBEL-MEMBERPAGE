import {
  configureStore, 
  applyMiddleware,
  compose
} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  initialState,
  composeEnhancers: compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
});

export default store;
