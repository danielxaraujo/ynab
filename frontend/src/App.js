import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { BaseLayout } from './containers'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

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
					<Route path='/' name='Home' component={BaseLayout} />
				</Switch>
			</Router>
		)
	}
}

export default App