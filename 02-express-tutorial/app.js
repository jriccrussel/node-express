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

app.get('/api/people', (req, res) => {
    const data = fs.readFileSync(person_data, 'utf8')
    const passed_data = JSON.parse(data)
    // console.log("%c 🥔 passed_data", "color:#b03734", passed_data);
    res.status(200).json({ success: true, data: passed_data })
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})
 