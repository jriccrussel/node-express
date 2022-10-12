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
const { prependOnceListener } = require('process')

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
// to get the form data
// perform post request in url and g handle nato sa atong server to get our data
app.use(express.urlencoded({ extended: false }))

// parse json
// handling incoming json data | send to our json data
app.use(express.json())

// reading data from people.json and add data to people.json
// even tho ang app.post ang '/api/people' same as app.get it doesnt mean na same ang function nya sa get it works diffrently sa app.get
app.post('/api/people', (req, res) => {
    const { name } = req.body
    if(!name){
        return res.status(400).json({ success: false, message: 'please provide name value' })    
    }
    // 201 -means if send a post request
    // res.status(201).json('Success')
    // person - key from fetchPeople() na ato ge map
    res.status(201).json({success: true, person: name})
})

app.get('/api/people', (req, res) => {
    const data = fs.readFileSync(person_data, 'utf8')
    const passed_data = JSON.parse(data)
    // console.log("%c 🥔 passed_data", "color:#b03734", passed_data);
    res.status(200).json({ success: true, data: passed_data })
})

// add
app.post('/api/people/add', (req, res) => {
    const { id, name } = req.body
    if(!name){ 
        return res.status(400).json({ success: false, message: 'please provide name value' })
    } 
    let read = fs.readFileSync(person_data, 'utf-8')
    let send_data = JSON.parse(read)
    // let map_data = send_data.map(data => {data.id, data.name})
    send_data.push(req.body)
    // map_data.push(req.body)
    let stringify_data = JSON.stringify(send_data, null, 2)
    // let stringify_data = JSON.stringify([...map_data], null, 4)
    fs.writeFileSync(person_data, stringify_data, 'utf-8')
    res.status(201).json({ success: true })
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
 