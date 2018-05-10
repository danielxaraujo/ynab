const restful = require('node-restful')
const mongoose = restful.mongoose

const TransactionSchema = new mongoose.Schema({
	check: {
		type: String,
		min: 12,
		max: 12,
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
		required: true
	},
	payee: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		default: 0,
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
		required: true
	}
})

const Transaction = restful.model('Transaction', TransactionSchema)
module.exports = Transaction