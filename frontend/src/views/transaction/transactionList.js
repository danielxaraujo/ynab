import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Card, CardHeader, CardBody, CardFooter, Table, thead, ButtonGroup, Button } from 'reactstrap'

import { search } from './transactionActions'

class TransactionList extends Component {
	constructor(props) {
		super(props)
		this.search = this.search.bind(this)
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
					<Table striped hover>
						<thead style={{ display: 'grid-inline' }}>
							<tr style={{ display: 'grid', gridTemplateColumns: '124px 44px 124px 4fr 6fr 10fr 104px 44px 84px' }}>
								<th className='text-center'>Check</th>
								<th className='text-center'><i className={`fas fa-bookmark fa-rotate-270 fa-lg text-muted`} /></th>
								<th className='text-center'>Date</th>
								<th>Payee</th>
								<th>Category</th>
								<th>Memo</th>
								<th>Value</th>
								<th className='text-center'><i className={`fas fa-copyright text-muted'} fa-lg`} /></th>
								<th className='text-center'></th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, idx) => {
								return (
									<tr key={idx} style={{ display: 'grid', gridTemplateColumns: '124px 44px 124px 4fr 6fr 10fr 104px 44px 84px' }}>
										<td className='text-center'>{transaction.check}</td>
										<td className='text-center'><i className={`fas fa-bookmark fa-rotate-270 fa-lg text-${transaction.flag == '' ? 'muted' : transaction.flag}`} /></td>
										<td className='text-center'>{transaction.date.split('T')[0]}</td>
										<td>{transaction.payee}</td>
										<td>{transaction.category}</td>
										<td>{transaction.memo}</td>
										<td>R$ {transaction.value}</td>
										<td className='text-center'><i className={`fas fa-copyright text-${transaction.cleared ? 'success' : 'muted'} fa-lg`} /></td>
										<td className='text-center'>
											<ButtonGroup>
												<Button size='sm' color='success' onClick={() => this.update(transaction)}>
													<i className='fas fa-edit'></i>
												</Button>
												<Button size='sm' color='danger' onClick={() => this.prepareDelete(transaction)}>
													<i className='fas fa-trash-alt'></i>
												</Button>
											</ButtonGroup>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</CardBody>
				<CardFooter className='app-card-footer d-flex flex-row-reverse'>
					<Button color='success' size='sm' onClick={this.create}>
						<i className='fas fa-plus-circle'></i> Adicionar
					</Button>
				</CardFooter>
			</Card>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({ transactions: state.transactionStore.transactions, accountId: ownProps.match.params.id })
const mapDispatchToProps = dispatch => bindActionCreators({ search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)