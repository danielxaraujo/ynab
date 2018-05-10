const queryParser = require('express-query-int')
const bodyParser = require('body-parser')
const allowCors = require('cors')
const express = require('express')
const server = express()

const port = process.env.PORT || 3000
const database = require('./config/database')
const { api, openApi } = require('./config/router')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors())
server.use(queryParser())

server.use('/oapi', openApi)
server.use('/api', api)

server.listen(port, () => {
	console.log(`BACKEND is running on port ${port}.`)
	database.then(() => {
		console.log('DATABASE is running')
	})
})