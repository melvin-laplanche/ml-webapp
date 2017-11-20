// @flow

import { Store, createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import { reducers } from './services/reducers'

let enhancers = []

// We debuging data only when not building form prod
if (process.env.NODE_ENV !== 'production') {
  const devStore = require('./store.dev')
  enhancers = devStore.enhancers
}

export default function newStore(history: any, initialState: any): Store<any> {
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, routerMiddleware(history)),
      ...enhancers,
    )
  )
  return store
}
