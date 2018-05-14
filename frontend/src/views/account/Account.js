import React, { Component } from 'react';
import Switch from 'react-switch'
import { Container, Card, CardBody, Table, ButtonGroup, Button } from 'reactstrap'

// Container style={{ backgroundColor: 'white', padding: '0px' }}
//Table  style={{ margin: '0px' }}

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = { accounts: [] }
	}
	componentDidMount() {
		this.props.fetch('api/account').then(json => (
			this.setState({ accounts: json.data })
		))
	}
	render() {
		return (
			<Container fluid>
				<Card>
					<CardBody>
						<Table responsive striped bordered={false}>
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
										<tr id={idx}>
											<td><i className={`${account.icon} fa-lg fa-fw`}></i></td>
											<td>{account.name}</td>
											<td>{account.type}</td>
											<td><Switch checked={account.budget} height={20} width={40} /></td>
											<td>
												<ButtonGroup>
													<Button size='sm' color='success'>
														<i className={'fas fa-edit fa-fw'}></i>
													</Button>
													<Button size='sm' color='danger'>
														<i className={'fas fa-trash-alt fa-fw'}></i>
													</Button>
												</ButtonGroup>
											</td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</Container>
		)
	}
}

export default Account