const logger = require( './middleware/logger')
const authorize = require( './middleware/authorize')
const express = require('express')
const app = express()
const fs = require('fs')
let { products, people } = require('./data')
const path_data = require('./data.json')
// const person_data = require('./person.json')

const person_data = './person.json'
// thirda party middleware
const morgan = require('morgan')

// app.get('./api/people', (req, res) => {
//     // const data = fs.readFileSync(person_data, 'utf8')
//     // const passed_data = JSON.parse(data)
//     res.status(200).json({ success: true, data: people })
//     // console.log("%c 🍆 person_data", "color:#b03734", people);
// })

// app.use applies the middleware to all the routes
// static assets 
app.use(express.static('./methods-public'))

// parse(to split and analyze the data) form data
// perform post request in url and g handle nato sa atong server to get our data
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
    const data = fs.readFileSync(person_data, 'utf8')
    const passed_data = JSON.parse(data)
    // console.log("%c 🥔 passed_data", "color:#b03734", passed_data);
    res.status(200).json({ success: true, data: passed_data })
})

// POST - applies 
app.post('/login', (req, res) => {
    const { name } = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    // console.log(req.body)
    // res.send('POST')
    res.status(200).send('Please provide credentials')
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})
 