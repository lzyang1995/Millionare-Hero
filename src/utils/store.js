import rootReducer from './reducers.js';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

// let loggerMiddleware = createLogger();

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;