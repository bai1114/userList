import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducer';
import thunk from 'redux-thunk';
//import logger from './logger';

const logger = store => next => action => {
  console.log('previous state', store.getState());
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
};

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;