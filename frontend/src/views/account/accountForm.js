import React, { Component } from 'react';
import Switch from 'react-switch'
import { Card, CardHeader, CardBody, CardFooter, Form, ButtonGroup, Button } from 'reactstrap'

class AccountForm extends Component {
	constructor(props) {
		super(props)
		this.state = { account: null }
		this.save = this.save.bind(this)
		this.back = this.back.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
	}
	componentDidMount() {
		console.log(this.props)
		console.log(this.state)
	}
	save() {
		console.log('Salvando')
	}
	back() {
		this.props.history.goBack()
	}
	render() {
		return (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Nova Conta
				</CardHeader>
				<CardBody className='app-card-body'>
					<Form>
						Deu certo
					</Form>
				</CardBody>
				<CardFooter className='app-card-footer'>
					<Button color='success' onClick={this.save}>
						<i className={'fas fa-save fa-fw'}></i>
						<span className='btn-label'>Salvar</span>
					</Button>
					<Button color='danger' onClick={this.back}>
						<i className={'fas fa-undo fa-fw'}></i>
						<span className='btn-label'>Cancelar</span>
					</Button>
				</CardFooter>
			</Card >
		)
	}
}

export default AccountForm