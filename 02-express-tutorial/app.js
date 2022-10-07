const logger = require( './middleware/logger')
const express = require('express')
const app = express()
const fs = require('fs')
const { products } = require('./data')
const path_data = require('./data.json')


// to access 'logger' - pass nato as second argument sa 'app.get'
app.get('/', logger, (req, res) => {
    // const method = req.method
    // const url = req.url
    // const time = new Date().getFullYear()
    // console.log(method, url, time)
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})