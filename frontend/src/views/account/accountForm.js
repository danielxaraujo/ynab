import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Select from 'react-select'
import { toast } from "react-toastify";

import { Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label } from 'reactstrap'
import { AppSwitch } from '@coreui/react'

import { update, create, handleChange, resetAccount } from './accountActions'

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
		this.handleSubmit = this.handleSubmit.bind(this)
		this.back = this.back.bind(this)
	}
	converToObject(value, options) {
		return options.find(option => option.value === value)
	}
	handleChange(name, option) {
		console.log(name)
		console.log(option)
		this.props.handleChange({
			target: {
				name: name,
				value: option.value
			}
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		const account = this.props.account
		if (account._id) {
			this.props.update(account)
			toast.success('Conta atualizada com sucesso');
		} else {
			this.props.create(account)
			toast.success('Conta inserida com sucesso');
		}
	}
	back() {
		this.props.resetAccount()
		this.props.history.goBack()
	}
	render() {
		const account = this.props.account
		return (
			<Card className='app-card'>
				<CardHeader className='app-card-header'>
					Nova Conta
				</CardHeader>
				<CardBody>
					<Form className='form-horizontal' onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Icone e Cor</Label>
							</Col>
							<Col xs='6' md='2'>
								<Select value={this.converToObject(account.color, colorOptions)}
									onChange={this.handleChange.bind(this, 'color')}
									options={colorOptions}
									components={{ Option: IconOption, SingleValue: IconOption }}
								/>
							</Col>
							<Col xs='6' md='2'>
								<Select value={this.converToObject(account.icon, iconOptions)}
									onChange={this.handleChange.bind(this, 'icone')}
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
									<Input name='name' type='text' value={account.name || ''} onChange={this.props.handleChange} placeholder='Nome da Conta' />
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
								<Select value={this.converToObject(account.type, typeOptions)}
									onChange={this.handleChange.bind(this, 'type')}
									options={typeOptions} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col xs='12' md='2'>
								<Label>Data Início</Label>
							</Col>
							<Col xs='12' md='10'>
								<InputGroup className='input-prepend'>
									<Input name='date' type='text' value={account.date || ''} onChange={this.props.handleChange} placeholder='99/99/9999' />
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
									<Input name='balance' type='text' value={account.balance || ''} onChange={this.props.handleChange} placeholder='Valor do Saldo Inicial' />
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
								<AppSwitch key={account.budget} name='budget' label color={'success'} checked={account.budget} onChange={this.props.handleChange} />
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter className='app-card-footer'>
					<Button color='primary' size='sm' onClick={this.handleSubmit}>
						<i className='fas fa-save'></i> Salvar
					</Button>
					<Button color='secundary' size='sm' onClick={this.back}>
						<i className='fas fa-undo'></i> Voltar
					</Button>
				</CardFooter>
			</Card >
		)
	}
}

const mapStateToProps = state => ({ account: state.accountStore.account })
const mapDispatchToProps = dispatch => bindActionCreators({ update, create, handleChange, resetAccount }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)