import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

const reducers = {
  routing: routerReducer,
};

export default function getStore(initialState) {
  const createStoreComposables = [
    applyMiddleware(thunk),
  ];

  const createStoreWithMiddleware = compose(...createStoreComposables)(createStore);
  const reducer = combineReducers(reducers);

  return createStoreWithMiddleware(reducer, initialState);
}
