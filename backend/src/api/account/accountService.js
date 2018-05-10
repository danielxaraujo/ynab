const mongoose = require('mongoose');
const Account = require('./account')

const getAll = (req, res) => {

	Account.find({}, (err, accounts) => {
		if (err) {
			res.status(500).json({ errors: [err] })
		} else {
			res.json({ accounts })
		}
	});
}

const getById = (req, res) => {

	const id = req.params.id || req.query.id || ''

	Account.findById(id, (err, account) => {
		if (err) {
			res.status(500).json({ errors: [err] })
		} else {
			res.json({ account })
		}
	});
}

const post = (req, res) => {

	const name = req.body.name || ''
	const date = req.body.date || ''
	const balance = req.body.balance || ''
	const type = req.body.type || ''
	const budget = req.body.budget || ''

	const account = new Account({ name: name, date: date, balance: balance, type: type, budget: budget })
	account.save(err => {
		if (err) {
			res.status(500).json({ errors: [err] })
		} else {
			res.json({ account })
		}
	})
}

const put = (req, res) => {

	const id = req.params.id || req.query.id || ''
	const name = req.body.name || ''
	const date = req.body.date || ''
	const balance = req.body.balance || ''
	const type = req.body.type || ''
	const budget = req.body.budget || ''

	Account.findByIdAndUpdate(id, {
		name: name,
		date: date,
		balance: balance,
		type: type,
		budget: budget
	}, { new: true }, (err, account) => {
		if (err) {
			res.status(500).json({ errors: [err] })
		} else {
			res.json({ account })
		}
	})
}

module.exports = { getAll, getById, post, put }