const express = require('express')
const mongoose = require('mongoose')
const db = require('./data/database')
const processorsRouter = require('./routes/processorRoutes')
const memoryRouter = require('./routes/memoryRoutes')
const motherboardRouter = require('./routes/motherboardRoutes')
const peripheralRouter = require('./routes/peripheralRoutes')
const computerRouter = require('./routes/computerRouter')

db.connect()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/computer', computerRouter)
app.use('/processor', processorsRouter)
app.use('/memory', memoryRouter)
app.use('/motherboard', motherboardRouter)
app.use('/peripheral', peripheralRouter)

module.exports = app