const logger = require( './middleware/logger')
const authorize = require( './middleware/authorize')
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const fs = require('fs')
// let { products, people } = require('./data')
// const path_data = require('./data.json')
const person_data = require('./person.json')
// const person_data = './person.json' 

// app.use applies the middleware to all the routes
// static assets 
app.use(express.static('./methods-public'))

// routes people
const peoplee = require('./routes/people')
// routes auth
const authh = require('./routes/auth')

// parse(to split and analyze the data) form data
// to get the form data
// perform post request in url and g handle nato sa atong server to get our data
app.use(express.urlencoded({ extended: false }))

// parse json
// handling incoming json data | send to our json data
app.use(express.json())

app.use('/api/people', peoplee)
app.use('/api/auth', authh)

app.listen(5000, () => {
    console.log('listening on port 5000')
})
 