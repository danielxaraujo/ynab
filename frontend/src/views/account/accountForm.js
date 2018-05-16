import React, { Component } from 'react'
import { Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, FormText, FormFeedback, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label } from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import Select from 'react-select'
import Swal from 'sweetalert2'

const IconOption = (props) => <div key={props.children} style={{ padding: '2px' }} {...props.innerProps}><i className={props.children}></i></div>

const colorOptions = [
	{ value: 'success', label: 'fas fa-square fa-lg text-success' },
	{ value: 'danger', label: 'fas fa-square fa-lg text-danger' },
	{ value: 'warning', label: 'fas fa-square fa-lg text-warning' }
]

const iconOptions = [
	{ value: 'fas fa-money-check', label: 'fas fa-money-check fa-lg text-primary' },
	{ value: 'fas fa-credit-card', label: 'fas fa-credit-card fa-lg text-primary' },
	{ value: 'fas fa-piggy-bank', label: 'fas fa-piggy-bank fa-lg text-primary' }
]

const typeOptions = [
	{ value: 'CHECKING', label: 'Conta Corrente' },
	{ value: 'CREDCARD', label: 'Cartão de Crédito' },
	{ value: 'SAVINGS', label: 'Poupança' },
	{ value: 'CASH', label: 'Dinheiro' }
]

class AccountForm extends Component {
	constructor(props) {
		super(props)
		this.state = { account: { budget: false } }
		this.handleChange = this.handleChange.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
		this.handleColorChange = this.handleColorChange.bind(this)
		this.handleIconChange = this.handleIconChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		if (this.props.location.state != null) {
			this.setState(this.props.location.state)
		}
	}
	handleChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		this.setState({ account: { ...this.state.account, [name]: value } })
	}
	handleTypeChange(option) {
		this.setState({ account: { ...this.state.account, type: option.value } })
	}
	handleColorChange(option) {
		this.setState({ account: { ...this.state.account, color: option.value } })
	}
	handleIconChange(option) {
		this.setState({ account: { ...this.state.account, icon: option.value } })
	}
	converToObject(value, options) {
		return options.find(option => option.value === value)
	}
	handleSubmit(event) {
		event.preventDefault()
		var url = 'api/account'
		var method = 'POST'
		if (this.state.account._id) {
			url = `${url}/${this.state.account._id}`
			method = 'PUT'
		}
		this.props.fetch(url, { method: method, body: JSON.stringify(this.state.account) }).then(json => {
			if (this.state.account._id) {
				Swal('Conta atualizada com sucesso', '', 'success');
			} else {
				Swal('Conta inserida com sucesso', '', 'success');
			}
			this.setState({ account: json.data })

		}).catch(err => Swal('Oops...', JSON.stringify(this.state.account), 'error'))
	}
	render() {
		const { account } = this.state
		return (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Nova Conta
				</CardHeader>
				<CardBody>
					<Form className='form-horizontal'>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Icone e Cor</Label>
							</Col>
							<Col xs='6' md='2'>
								<Select value={this.converToObject(account.color, colorOptions)}
									onChange={this.handleColorChange}
									options={colorOptions}
									components={{ Option: IconOption, SingleValue: IconOption }}
								/>
							</Col>
							<Col xs='6' md='2'>
								<Select value={this.converToObject(account.icon, iconOptions)}
									onChange={this.handleIconChange}
									options={iconOptions}
									components={{ Option: IconOption, SingleValue: IconOption }}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Nome</Label>
							</Col>
							<Col xs='12' md='10'>
								<InputGroup className='input-prepend'>
									<Input name='name' type='text' value={account.name || ''} onChange={this.handleChange} placeholder='Nome da Conta' />
									<InputGroupAddon addonType='append'>
										<InputGroupText>@</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Tipo</Label>
							</Col>
							<Col xs='12' md='10'>
								<Select value={this.converToObject(account.type, typeOptions)} onChange={this.handleTypeChange} options={typeOptions} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Data Início</Label>
							</Col>
							<Col xs='12' md='10'>
								<InputGroup className='input-prepend'>
									<Input name='date' type='text' value={account.date || ''} onChange={this.handleChange} placeholder='99/99/9999' />
									<InputGroupAddon addonType='append'>
										<InputGroupText><i className='far fa-calendar-alt'></i></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Valoer inicial</Label>
							</Col>
							<Col xs='12' md='10'>
								<InputGroup className='input-prepend'>
									<Input name='balance' type='text' value={account.balance || ''} onChange={this.handleChange} placeholder='Valor do Saldo Inicial' />
									<InputGroupAddon addonType='append'>
										<InputGroupText><i className='fas fa-dollar-sign'></i></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Faz parte do orçamento</Label>
							</Col>
							<Col xs='12' md='2'>
								<AppSwitch key={account.budget} name='budget' label color={'success'} checked={account.budget} onChange={this.handleChange} />
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter className='app-card-footer'>
					<Button color='primary' size='sm' onClick={this.handleSubmit}>
						<i className={'fas fa-save fa-fw'}></i>
						<span className='btn-label'>Salvar</span>
					</Button>
					<Button color='secundary' size='sm' onClick={() => this.props.history.goBack()}>
						<i className={'fas fa-undo fa-fw'}></i>
						<span className='btn-label'>Voltar</span>
					</Button>
				</CardFooter>
			</Card >
		)
	}
}

export default AccountForm