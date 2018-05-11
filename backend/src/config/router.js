const express = require('express')
const { auth, login, signup, validateToken } = require('../api/auth/authService')

// Transaction Service
const Account = require('../api/account/account')

/**
 * Rotas seguras
 */
const api = express.Router()
api.use(auth)

Account.register(api, '/account')

/*
 * Rotas abertas
 */
const openApi = express.Router()
openApi.post('/login', login)
openApi.post('/signup', signup)
openApi.post('/validateToken', validateToken)

module.exports = { api, openApi }