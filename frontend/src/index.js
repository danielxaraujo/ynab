import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import promise from 'redux-promise'

import App from './App'
import accountReducer from './views/account/accountReducer';

const reducers = combineReducers({
    accountStore: accountReducer,
    routing: routerReducer
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'))