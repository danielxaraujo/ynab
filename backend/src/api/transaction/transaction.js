const mongoose = require('mongoose')
const model = require('../../util/modelService')

const transactionSchema = new mongoose.Schema({
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
			'RED',
			'GREEN',
			'BLUE',
			'YELLOW',
			'NONE'
		],
		default: 'NONE',
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
	}
})

module.exports = model('Transaction', transactionSchema)