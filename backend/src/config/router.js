const express = require('express')
const { auth, login, signup, validateToken } = require('../api/auth/authService')

const createService = require('../util/createService')

// Services
const Account = require('../api/account/account')
const Transaction = require('../api/transaction/transaction')

/*
 * Rotas abertas
 */
const oapi = express.Router()
oapi.post('/login', login)
oapi.post('/signup', signup)
oapi.post('/validateToken', validateToken)

/**
 * Rotas seguras
 */
const api = express.Router()
api.use(auth)
api.use('/account', createService(Account))
api.use('/transaction', createService(Transaction))

module.exports = { api, oapi }