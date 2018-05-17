import React from 'react'
import ReactDOM from 'react-dom'

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import multi from 'redux-multi'
import promise from 'redux-promise'

import App from './App'
import { accountReducer } from './reducers';

const reducers = combineReducers({
	accountStore: accountReducer
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'))