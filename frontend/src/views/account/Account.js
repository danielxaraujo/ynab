import React, { Component } from 'react';
import Switch from 'react-switch'
import { Container, Card, CardBody, Table, ButtonGroup, Button } from 'reactstrap'

// Container style={{ backgroundColor: 'white', padding: '0px' }}
//Table  style={{ margin: '0px' }}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY0ZjczMmE2NTUxMTI5NTY2NmFhMmYiLCJuYW1lIjoiRGFuaWVsIFhhdmllciBBcmHDumpvIiwiZW1haWwiOiJkYW5pZWx4YXJhdWpvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGNPVWE5ekxJZEZuSk56UU14NWEuSWUwUlI0ZUg5L1FHWVdPMkJkSUM5cWMvREpteW5lR1BHIiwiX192IjowLCJpYXQiOjE1MjYyMjY0OTgsImV4cCI6MTUyNjMxMjg5OH0.M6nKK0NTOx0Q94Eh9V2XtCVfz545Ywg00iTZQrYt4kA'
const URL = 'http://127.0.0.1:3000/api/account'

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: []
		};
	}
	componentDidMount() {
		fetch(URL, {
			headers: new Headers({
				'Authorization': `Bearer ${TOKEN}`
			})
		}).then(response => (
			response.json()
		)).then(json => (
			this.setState({ accounts: json.data })
		))
	}
	render() {
		let accounts = this.state.accounts
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
								{accounts.map((account, idx) => {
									return (
										<tr id={idx}>
											<td><i className={'fas fa-money-check-alt fa-lg fa-fw'}></i></td>
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