import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import AccountList from './accountList'
import AccountForm from './accountForm'

class Account extends Component {
	render() {
		return (
			<Container fluid>
				<Switch>
					<Route path='/account/create' name='New' component={AccountForm} />
					<Route path='/account/update' name='Edit' component={AccountForm} />
					<Route path='/account/list' name='List' component={AccountList} />
					<Redirect from="/account" to="/account/list" />
				</Switch>
			</Container>
		)
	}
}

export default Account