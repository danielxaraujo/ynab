import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, FormText, FormFeedback, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label } from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import Select from 'react-select';

const IconOption = (props) => {
	return <div key={props.children} {...props.innerProps}><i className={props.children}></i></div>
}

const colorOptions = [
	{ value: 'success', label: 'fas fa-square fa-lg text-success' },
	{ value: 'danger', label: 'fas fa-square fa-lg text-danger' },
	{ value: 'warning', label: 'fas fa-square fa-lg text-warning' }
]

class AccountForm extends Component {
	constructor(props) {
		super(props)
		this.state = { account: {} }
		this.handleChange = this.handleChange.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
		this.handleColorChange = this.handleColorChange.bind(this)
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
		this.setState({ account: { ...this.state.account, icon: option.value } });
	}
	handleColorChange(option) {
		this.setState({ account: { ...this.state.account, color: option.value } });
	}
	converToObject(value, options) {
		return options.find(option => option.value == value)
	}
	handleSubmit(event) {
		event.preventDefault();
	}
	render() {
		const { account } = this.state
		return (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Nova Conta
				</CardHeader>
				<CardBody>
					<Form className='form-horizontal' onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Col xs="6" md="2">
								<Label>Icone e Cor</Label>
							</Col>
							<Col xs="6" md="4">
								<Select name='color'
									value={this.converToObject(account.color, colorOptions)}
									onChange={this.handleColorChange}
									options={colorOptions}
									components={{ Option: IconOption, SingleValue: IconOption }}
								/>
							</Col>
							<Col xs="6" md="4">
								<Select name='icon' value={account.icon} onChange={this.handleIconChange} options={[
									{ value: 'fas fa-money-check', label: 'fas fa-money-check fa-lg' },
									{ value: 'fas fa-credit-card', label: 'fas fa-credit-card fa-lg' },
									{ value: 'fas fa-piggy-bank', label: 'fas fa-piggy-bank fa-lg' }
								]} components={{ Option: IconOption, SingleValue: IconOption }} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs="12" md="2">
								<Label>Nome</Label>
							</Col>
							<Col xs="12" md="10">
								<InputGroup className='input-prepend'>
									<Input name='name' type='text' value={account.name || ''} onChange={this.handleChange} placeholder='Nome da Conta' />
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
								<Select name='type' onChange={this.handleTypeChange} options={[
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
									<Input name='date' type='text' value={account.date || ''} onChange={this.handleChange} placeholder='99/99/9999' />
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
									<Input name='balance' type='text' value={account.balance || ''} onChange={this.handleChange} placeholder='Valor do Saldo Inicial' />
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
								<AppSwitch name='budget' color={'success'} label checked={account.budget} onChange={this.handleChange} />
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