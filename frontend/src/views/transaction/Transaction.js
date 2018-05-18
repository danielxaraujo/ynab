import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import TransactionList from './transactionList'
import TransactionForm from './transactionForm'

class Transaction extends Component {
	render() {
		return (
			<Container fluid>
				<Switch>
					<Route path='/transaction' exact={true} name='Transaction' component={TransactionForm} />
					<Route path='/transaction/:id' name='Transactions' component={TransactionList} />
				</Switch>
			</Container>
		)
	}
}

export default Transaction