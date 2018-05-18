const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const model = require('../../util/modelService')

const transactionSchema = new Schema({
	check: {
		type: String,
		min: 12,
		max: 12,
		unique: true,
		required: true
	},
	memo: {
		type: String,
		min: 0,
		max: 50,
		required: true
	},
	flag: {
		type: String,
		uppercase: true,
		enum: [
			'primary',
			'secondary',
			'success',
			'danger',
			'warning',
			'info',
			''
		],
		default: '',
		required: false
	},
	payee: {
		type: String,
		required: false
	},
	category: {
		type: String,
		required: false
	},
	value: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	cleared: {
		type: Boolean,
		default: false,
		required: false
	},
	accountId: {
		type: ObjectId,
		required: false
	}
})

module.exports = model('Transaction', transactionSchema)