import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { AppSwitch } from '@coreui/react'
import { Card, CardHeader, CardBody, CardFooter, Table, ButtonGroup, Button } from 'reactstrap'
import Swal from 'sweetalert2'

import { search, selectAction } from './accountActions'

class AccountList extends Component {
	constructor(props) {
		super(props)
		this.state = { accounts: [] }
		this.search = this.search.bind(this)
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.prepareDelete = this.prepareDelete.bind(this)
	}
	search() {
		this.props.search()
	}
	create() {
		this.props.history.push('/account/create')
	}
	update(account) {
		this.props.history.push('/account/update', { account: account })
	}
	prepareDelete(account) {
		Swal({
			title: 'Você tem certeza?',
			text: 'Depois de deletado, você não poderá recupear os dados da conta!',
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true
		}).then((willDelete) => {
			if (willDelete.value) {
				this.delete(account)
			} else {
				Swal('A operação foi cancelada!', '', 'error');
			}
		});
	}
	delete(account) {
		var url = `api/account/${account._id}`
		var method = 'DELETE'
		this.props.fetch(url, { method: method }).then(json => {
			this.search()
			Swal('Conta removida com sucesso!', '', 'success');
		}).catch(err => Swal('Oops...', JSON.stringify(this.state.account), 'error'))

	}
	render() {
		const accounts = this.props.accounts
		return accounts ? (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Lista de Contas
						<div className='card-header-actions'>
						<a className='card-header-action btn' onClick={this.search}><i id='search' className='fas fa-sync-alt'></i></a>
					</div>
				</CardHeader>
				<CardBody className='app-card-body'>
					<Table className='app-card-table' responsive striped>
						<thead>
							<tr>
								<th>Icon</th>
								<th>Name</th>
								<th>Type</th>
								<th>Budget</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((account, idx) => {
								return (
									<tr key={idx}>
										<td><i className={`${account.icon} ${account.color} fa-lg`}></i></td>
										<td>{account.name}</td>
										<td>{account.type}</td>
										<td><AppSwitch label color={'success'} checked={!!account.budget} disabled /></td>
										<td>
											<ButtonGroup>
												<Button size='sm' color='success' onClick={() => this.update(account)}>
													<i className={'fas fa-edit'}></i>
												</Button>
												<Button size='sm' color='danger' onClick={() => this.prepareDelete(account)}>
													<i className={'fas fa-trash-alt'}></i>
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
						<i className='fas fa-plus-circle'></i>
						<span className='btn-label'>Adicionar</span>
					</Button>
				</CardFooter>
			</Card>
		) : null
	}
}

const mapStateToProps = state => ({ accounts: state.accountStore.accounts })
const mapDispatchToProps = dispatch => bindActionCreators({ search, selectAction }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountList)