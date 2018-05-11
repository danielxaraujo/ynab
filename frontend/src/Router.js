import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { BaseLayout } from './containers';
import { Dashboard, Account } from './views';

const routes = [
	{ path: '/', exact: true, name: 'Home', component: BaseLayout },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/account', name: 'Account', component: Account }
];

class Router extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					{routes.map((route, idx) => {
						return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
							<route.component {...props} />
						)} />) : (null);
					})}
					<Redirect from="/" to="/dashboard" />
				</Switch>
			</React.Fragment>
		)
	}
}

export { Router, routes };