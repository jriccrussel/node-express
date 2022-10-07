const logger = require( './middleware/logger')
const express = require('express')
const app = express()
const fs = require('fs')
const { products } = require('./data')
const path_data = require('./data.json')


// to access 'logger' - pass nato as second argument sa 'app.get'
// app.get('/', logger, (req, res) => {
//     res.send('Home')
// })

app.use(logger)

app.get('/', (req, res) => {
    res.send('Home')
})


app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    res.send('Items')
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})