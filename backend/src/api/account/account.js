const mongoose = require('mongoose');
const model = require('../../util/modelService')

const accountSchema = new mongoose.Schema({
	name: {
		type: String,
		min: 3,
		max: 15,
		unique: true,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	balance: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		uppercase: true,
		enum: [
			'CHECKING',
			'CREDCARD',
			'SAVINGS',
			'CASH'
		],
		required: true
	},
	budget: {
		type: Boolean,
		required: true
	},
	icon: {
		type: String,
		required: true,
		default: 'fas fa-tag'
	},
	color: {
		type: String,
		lowercase: true,
		enum: [
			'primary',
			'secondary',
			'success',
			'danger',
			'warning',
			'info',
			''
		],
		required: true,
		default: ''
	}
})

module.exports = model('Account', accountSchema)