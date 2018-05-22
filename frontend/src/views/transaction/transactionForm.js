import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import MaskedInput from 'react-text-mask'

import { ButtonGroup, Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const RowStyle = { display: 'grid', gridTemplateColumns: '124px 50px 124px 4fr 6fr 10fr 104px 44px 90px', alignSelf: 'center', minHeight: '45px' }
const ColStyle = { alignSelf: 'center' }
const ColCenteredStyle = { alignSelf: 'center', textAlign: 'center' }

const IconOption = props => <div key={props.children} {...props.innerProps}><i className={props.children}></i></div>

const converToObject = (value, options) => {
	return options.find(option => option.value === value)
}

const customStyles = {
	container: (base, state) => ({
		...base,
		borderRadius: '.25rem',
		backgroundColor: 'transparent'
	}),
	control: (base, state) => ({
		borderRadius: '.25rem',
		border: state.isFocused ? '1px solid #8ad4ee' : '1px solid #e4e7ea',
		boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(32, 168, 216, .25)' : '',
		backgroundColor: 'white'
	}),
	valueContainer: (base, state) => ({
		...base,
		padding: '.375rem',
		maxHeight: '33px',
		borderRadius: '.25rem',
		backgroundColor: 'white',
	})
}

const flagOptions = [
	{ value: 'muted', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-muted' },
	{ value: 'primary', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-primary' },
	{ value: 'secondary', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-secondary' },
	{ value: 'success', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-success' },
	{ value: 'danger', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-danger' },
	{ value: 'warning', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-warning' },
	{ value: 'info', label: 'fas fa-bookmark fa-rotate-270 fa-lg fa-fw text-info' }
]

const ReadOnlyRow = ({ transaction, edit, remove, onDoubleClick }) => (
	<tr style={RowStyle} onDoubleClick={onDoubleClick}>
		<td style={ColCenteredStyle}>{transaction.check}</td>
		<td style={ColCenteredStyle}><i className={`fas fa-bookmark fa-rotate-270 fa-lg text-${transaction.flag === '' ? 'secondary' : transaction.flag}`} /></td>
		<td style={ColCenteredStyle}>{transaction.date.split('T')[0]}</td>
		<td style={ColStyle}>{transaction.payee}</td>
		<td style={ColStyle}>{transaction.category}</td>
		<td style={ColStyle}>{transaction.memo}</td>
		<td style={ColStyle}>R$ {transaction.value}</td>
		<td style={ColCenteredStyle}><i className={`fas fa-copyright text-${transaction.cleared ? 'success' : 'secondary'} fa-lg`} /></td>
		<td style={ColCenteredStyle}>
			<ButtonGroup>
				<Button size='sm' color='success' onClick={() => edit(transaction)}>
					<i className='fas fa-edit fa-fw'></i>
				</Button>
				<Button size='sm' color='danger' onClick={() => remove(transaction)}>
					<i className='fas fa-trash-alt fa-fw'></i>
				</Button>
			</ButtonGroup>
		</td>
	</tr>
)

const EditableRow = ({ transaction, save, cancel, onDoubleClick }) => (
	<tr style={RowStyle} onDoubleClick={onDoubleClick}>
		<td style={ColCenteredStyle}><MaskedInput value={transaction.check} className='form-control' mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]} /></td>
		<td style={ColCenteredStyle}><Select value={converToObject(transaction.flag, flagOptions)} options={flagOptions} isSearchable={false} placeholder={''} styles={customStyles} components={{ Option: IconOption, SingleValue: IconOption, DropdownIndicator: null, Input: null }} /></td>
		<td style={ColCenteredStyle}><MaskedInput value={transaction.date} className='form-control' mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]} /></td>
		<td style={ColStyle}>{transaction.payee}</td>
		<td style={ColStyle}>{transaction.category}</td>
		<td style={ColStyle}>{transaction.memo}</td>
		<td style={ColStyle}>R$ {transaction.value}</td>
		<td style={ColCenteredStyle}><i className={`fas fa-copyright text-${transaction.cleared ? 'success' : 'secondary'} fa-lg`} /></td>
		<td style={ColCenteredStyle}>
			<ButtonGroup>
				<Button size='sm' color='success' onClick={save}>
					<i className='fas fa-check fa-fw'></i>
				</Button>
				<Button size='sm' color='danger' onClick={cancel}>
					<i className='fas fa-times fa-fw'></i>
				</Button>
			</ButtonGroup>
		</td>
	</tr>
)

class TransactionForm extends Component {
	constructor(props) {
		super(props)
		this.state = { isReadOnly: true }
		this.edit = this.edit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.onDoubleClick = this.onDoubleClick.bind(this)
	}
	edit() {
		this.setState({ isReadOnly: false })
	}
	cancel() {
		this.setState({ isReadOnly: true })
	}
	onDoubleClick() {
		this.edit()
	}
	render() {
		const { index, transaction, save, remove } = this.props
		return this.state.isReadOnly ?
			<ReadOnlyRow index={index} transaction={transaction} edit={this.edit} remove={remove} onDoubleClick={this.onDoubleClick} /> :
			<EditableRow index={index} transaction={transaction} save={save} cancel={this.cancel} onDoubleClick={this.onDoubleClick} />
	}
}

TransactionForm.propTypes = {
	transaction: PropTypes.object.isRequired,
	save: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

export default TransactionForm