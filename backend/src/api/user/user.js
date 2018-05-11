const mongoose = require('mongoose')
const model = require('../../util/modelService')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		min: 6,
		max: 20,
		required: true
	}
})

module.exports = model('User', userSchema)