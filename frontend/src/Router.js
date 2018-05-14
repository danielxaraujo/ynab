import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import FullLayout from './layout/fullLayout';
import { Dashboard, Account, Transaction } from './views';

const routes = [
	{ path: '/', exact: true, name: 'Home', component: FullLayout },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/account', name: 'Account', component: Account },
	{ path: '/transaction/:accountId', name: 'Transactions', component: Transaction },
];

class Router extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					{routes.map((route, idx) => {
						return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
							<route.component {...this.props} />
						)} />) : (null);
					})}
					<Redirect from="/" to="/dashboard" />
				</Switch>
			</React.Fragment>
		)
	}
}

export { Router, routes };