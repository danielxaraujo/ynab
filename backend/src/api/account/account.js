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
	}
})

module.exports = model('Account', accountSchema)