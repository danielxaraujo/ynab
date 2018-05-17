import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FullLayout from './layout/fullLayout'
import { Login } from './views'

// Font Awsome
import '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-regular'
import '@fortawesome/fontawesome-free-solid'

// Core UI
import '@coreui/coreui/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

// Application Styles
import 'react-select/dist/react-select.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/login' name='Login' component={Login} />
					<Route path='/' name='Home' component={FullLayout} />
				</Switch>
			</Router>
		)
	}
}

export default App