import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, FormText, FormFeedback, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label } from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import Select from 'react-select';

class Icon extends Component {
	constructor(props) {
		super(props)
		this.state = { icon: props.icon }
	}
	componentWillReceiveProps(props) {
		this.setState({ icon: props.icon })
	}
	render() {
		return <span key={this.state.icon}><i className={this.state.icon}></i></span>
	}
}
class AccountForm extends Component {
	constructor(props) {
		super(props)
		this.state = { account: {} }
		this.handleChange = this.handleChange.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
		this.handleIconChange = this.handleIconChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		if (this.props.location.state != null) {
			if (this.props.location.state.account.date) {
				this.props.location.state.account.date = this.props.location.state.account.date.split('T')[0]
			}
			this.setState(this.props.location.state)
		}
	}
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ account: { ...this.state.account, [name]: value } });
	}
	handleTypeChange(option) {
		this.setState({ account: { ...this.state.account, type: option.value } });
	}
	handleIconChange(option) {
		if (option) {
			this.setState({ account: { ...this.state.account, icon: option.value } });
		} else {
			this.setState({ account: { ...this.state.account, icon: null } });
		}
	}
	handleSubmit(event) {
		event.preventDefault();
	}
	render() {
		return (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Nova Conta
				</CardHeader>
				<CardBody>
					<Form className='form-horizontal' onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Col xs="6" md="2">
								<Label>Icone</Label>
							</Col>
							<Col xs="6" md="2">
								<Select value={this.state.account.icon} onChange={this.handleIconChange} options={[
									{ value: 'fas fa-money-check', label: <Icon icon={'fas fa-money-check'} /> },
									{ value: 'fas fa-credit-card', label: <Icon icon={'fas fa-credit-card'} /> },
									{ value: 'fas fa-piggy-bank', label: <Icon icon={'fas fa-piggy-bank'} /> }
								]} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Nome</Label>
							</Col>
							<Col xs="12" md="10">
								<InputGroup className='input-prepend'>
									<Input name='name' type='text' value={this.state.account.name || ''} onChange={this.handleChange} placeholder='Nome da Conta' />
									<InputGroupAddon addonType='append'>
										<InputGroupText>@</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Tipo</Label>
							</Col>
							<Col xs="12" md="10">
								<Select value={this.state.account.type} onChange={this.handleTypeChange} options={[
									{ value: 'CHECKING', label: 'Conta Corrente' },
									{ value: 'CREDCARD', label: 'Cartão de Crédito' },
									{ value: 'SAVINGS', label: 'Poupança' },
									{ value: 'CASH', label: 'Dinheiro' },
								]} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Data Início</Label>
							</Col>
							<Col xs="12" md="10">
								<InputGroup className='input-prepend'>
									<Input name='date' type='text' value={this.state.account.date || ''} onChange={this.handleChange} placeholder='99/99/9999' />
									<InputGroupAddon addonType='append'>
										<InputGroupText><i className='far fa-calendar-alt'></i></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Valoer inicial</Label>
							</Col>
							<Col xs="12" md="10">
								<InputGroup className='input-prepend'>
									<Input name='balance' type='text' value={this.state.account.balance || ''} onChange={this.handleChange} placeholder='Valor do Saldo Inicial' />
									<InputGroupAddon addonType='append'>
										<InputGroupText><i className='fas fa-dollar-sign'></i></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Faz parte do orçamento</Label>
							</Col>
							<Col xs="12" md="2">
								<AppSwitch name='budget' color={'success'} label checked={!!this.state.account.budget} onChange={this.handleChange} />
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter className='app-card-footer'>
					<Button color='success' size='sm' onClick={this.save}>
						<i className={'fas fa-save fa-fw'}></i>
						<span className='btn-label'>Salvar</span>
					</Button>
					<Button color='danger' size='sm' onClick={() => this.props.history.goBack()}>
						<i className={'fas fa-undo fa-fw'}></i>
						<span className='btn-label'>Cancelar</span>
					</Button>
				</CardFooter>
			</Card >
		)
	}
}

export default AccountForm