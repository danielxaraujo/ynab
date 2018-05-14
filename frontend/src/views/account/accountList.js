import React, { Component } from 'react';
import Switch from 'react-switch'
import { Card, CardHeader, CardBody, CardFooter, Table, ButtonGroup, Button } from 'reactstrap'
import AuthService from '../../components/authService'

const authService = new AuthService('http://127.0.0.1:3000');

class AccountList extends Component {
	constructor(props) {
		super(props)
		this.state = { accounts: [] }
		this.search = this.search.bind(this)
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
	}
	componentDidMount() {
		this.search()
	}
	search() {
		const el = document.getElementById('search').classList
		el.toggle('fa-spin')
		authService.fetch('api/account').then(json => this.setState({ accounts: json.data }))
		el.toggle('fa-spin')
	}
	create() {
		this.props.history.push('/account/create')
	}
	update(account) {
		console.log(account)
		this.props.history.push('/account/update', { account: account })
	}
	render() {
		return (
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
							{this.state.accounts.map((account, idx) => {
								return (
									<tr key={idx}>
										<td><i className={`${account.icon} ${account.color} fa-lg`}></i></td>
										<td>{account.name}</td>
										<td>{account.type}</td>
										<td><Switch checked={account.budget} onChange={() => { }} onColor={'#4dbd74'} height={20} width={40} /></td>
										<td>
											<ButtonGroup>
												<Button size='sm' color='success' onClick={() => this.update(account)}>
													<i className={'fas fa-edit'}></i>
												</Button>
												<Button size='sm' color='danger'>
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
				<CardFooter className='app-card-footer'>
					<Button color='success' onClick={this.create}>
						<i className='fas fa-plus-circle'></i>
						<span className='btn-label'>Adicionar</span>
					</Button>
				</CardFooter>
			</Card>
		)
	}
}

export default AccountList