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
					<Route path='/account/create' name='New' render={() => <AccountForm {...this.props} />} />
					<Route path='/account/update' name='Edit' render={() => <AccountForm {...this.props} />} />
					<Route path='/account/list' name='List' render={() => <AccountList {...this.props} />} />
					<Redirect from="/account" to="/account/list" />
				</Switch>
			</Container>
		)
	}
}

export default Account