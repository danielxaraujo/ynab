import React, { Component } from 'react';
import { Container, Card, CardBody, Table } from 'reactstrap'

class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = { transactions: [] }
	}
	componentDidMount() {
		const { match: { params } } = this.props;
		this.props.fetch('api/transaction/', { accountId: params.id }).then(json => this.setState({ transactions: json.data }))
	}
	render() {
		return (
			<Container fluid>
				<Card>
					<CardBody>
						<Table responsive striped bordered={false}>
							<thead>
								<tr>
									<th>check</th>
									<th>memo</th>
									<th>value</th>
								</tr>
							</thead>
							<tbody>
								{this.state.transactions.map((transaction, idx) => {
									return (
										<tr id={idx}>
											<td>{transaction.check}</td>
											<td>{transaction.memo}</td>
											<td>{transaction.value}</td>
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

export default Transaction