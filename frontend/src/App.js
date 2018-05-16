import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FullLayout from './layout/fullLayout'
import { Login } from './views'

// Styles
import '@coreui/coreui/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'
//import "react-datepicker/dist/react-datepicker.css";
//import 'react-select/dist/react-select.css';
import './App.css'

// Font Awsome
import '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-regular'
import '@fortawesome/fontawesome-free-solid'

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