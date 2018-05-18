import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Card, CardHeader, CardBody, CardFooter, Table, ButtonGroup, Button } from 'reactstrap'

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
					<Table responsive striped>
						<thead>
							<tr className='d-flex'>
								<th className='text-center col-1'>Check</th>
								<th className='text-center col-1'>Flag</th>
								<th className='text-center col-1'>Date</th>
								<th className='col-1'>Payee</th>
								<th className='col-1'>Category</th>
								<th className='col-4'>Memo</th>
								<th className='col-1'>Value</th>
								<th className='text-center col-1'>Cleared</th>
								<th className='text-center col-1'></th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, idx) => {
								return (
									<tr key={idx} className='d-flex'>
										<td className='text-center col-1'>{transaction.check}</td>
										<td className='text-center col-1'><i className={`fas fa-bookmark fa-rotate-270 text-${transaction.flag} fa-lg`} /></td>
										<td className='text-center col-1'>{transaction.date}</td>
										<td className='col-1'>{transaction.payee}</td>
										<td className='col-1'>{transaction.category}</td>
										<td className='col-4'>{transaction.memo}</td>
										<td className='col-1'>{transaction.value}</td>
										<td className='text-center col-1'><i className={`fas fa-copyright text-${transaction.cleared ? 'success' : 'muted'} fa-lg`} /></td>
										<td className='text-center col-1'>
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