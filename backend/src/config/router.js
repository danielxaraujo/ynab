const express = require('express')
const { auth, login, signup, validateToken } = require('../api/auth/authService')

/**
 * Rotas seguras
 */
const api = express.Router()
api.use(auth)

/*
 * Rotas abertas
 */
const openApi = express.Router()
openApi.post('/login', login)
openApi.post('/signup', signup)
openApi.post('/validateToken', validateToken)

module.exports = { api, openApi }