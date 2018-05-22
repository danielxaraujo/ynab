import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Card, CardHeader, CardBody, CardFooter, Table, thead, ButtonGroup, Button } from 'reactstrap'

import { search, create } from './transactionActions'
import TransactionForm from './transactionForm'

class TransactionList extends Component {
	constructor(props) {
		super(props)
		this.search = this.search.bind(this)
		this.prepareCreate = this.prepareCreate.bind(this)
	}
	componentWillMount() {
		this.search(this.props.accountId)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.accountId !== nextProps.accountId) {
			this.search(nextProps.accountId)
		}
	}
	search(accountId) {
		this.props.search(accountId)
	}
	prepareCreate() {
		this.props.create()
	}
	render() {
		const transactions = this.props.transactions
		return (
			<Card className='card-list'>
				<CardHeader>
					Lista de Transações
					<div className='card-header-actions'>
						<a className='card-header-action btn' onClick={() => this.search(this.props.accountId)}><i id='search' className='fas fa-sync-alt'></i></a>
					</div>
				</CardHeader>
				<CardBody>
					<Table responsive borderless striped hover size={'sm'}>
						<thead style={{ display: 'grid-inline' }}>
							<tr style={{ display: 'grid', gridTemplateColumns: '124px 50px 124px 4fr 6fr 10fr 104px 44px 90px' }}>
								<th className='text-center'>Check</th>
								<th className='text-center'><i className={`fas fa-bookmark fa-rotate-270 fa-lg text-muted`} /></th>
								<th className='text-center'>Date</th>
								<th>Payee</th>
								<th>Category</th>
								<th>Memo</th>
								<th>Value</th>
								<th className='text-center'><i className={'fas fa-copyright fa-lg text-muted'} /></th>
								<th className='text-center'></th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, idx) => {
								return (
									<TransactionForm key={idx} transaction={transaction} save={this.save} cancel={this.cancel} />
								)
							})}
						</tbody>
						<tfoot style={{ display: 'grid-inline' }}>
						</tfoot>
					</Table>
				</CardBody>
				<CardFooter className='app-card-footer d-flex flex-row-reverse'>
					<Button color='success' size='sm' onClick={this.prepareCreate}>
						<i className='fas fa-plus-circle'></i> Adicionar
					</Button>
				</CardFooter>
			</Card>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({ transactions: state.transactionStore.transactions, accountId: ownProps.match.params.id })
const mapDispatchToProps = dispatch => bindActionCreators({ search, create }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)