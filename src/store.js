import {applyMiddleware, compose} from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer';

const initialState = {};

const middleware = [thunk];

const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middleware)
  )
const store = createStore (
    rootReducer,
    initialState,
    composedEnhancer
);

export default store;