import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const initialState = {};
const middlewares = [thunk, logger];
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
);

export default store;
