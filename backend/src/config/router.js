const express = require('express')
const { auth, login, signup, validateToken } = require('../api/auth/authService')

// Transaction Service
const { getById, getAll, post, put } = require('../api/account/accountService')

/**
 * Rotas seguras
 */
const api = express.Router()
api.use(auth)
api.get('/account/:id', getById)
api.get('/account', getAll)
api.post('/account', post)
api.put('/account/:id', put)

/*
 * Rotas abertas
 */
const openApi = express.Router()
openApi.post('/login', login)
openApi.post('/signup', signup)
openApi.post('/validateToken', validateToken)

module.exports = { api, openApi }