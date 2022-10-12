const logger = require( './middleware/logger')
const authorize = require( './middleware/authorize')
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const fs = require('fs')
let { products, people } = require('./data')
// const path_data = require('./data.json')
const person_data = require('./person.json')

// const person_data = './person.json'
// thirda party middleware
const morgan = require('morgan')
const { prependOnceListener } = require('process')

// app.get('./api/people', (req, res) => {
//     // const data = fs.readFileSync(person_data, 'utf8')
//     // const passed_data = JSON.parse(data)
//     res.status(200).json({ success: true, data: people })
//     // console.log("%c 🍆 person_data", "color:#b03734", people)
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
// add - js data
// app.post('/api/people', (req, res) => {
//     const { name } = req.body
//     if(!name){
//         return res.status(400).json({ success: false, message: 'please provide name value' })    
//     }
//     // 201 -means if send a post request
//     // res.status(201).json('Success')
//     // person - key from fetchPeople() na ato ge map
//     res.status(201).json({success: true, person: name})
// })

// get - show the body of js data file
// app.get('/api/people', (req, res) => {
//     res.status(200).json({ success: true, data: people })
//   })

// get - show the body of json data file
// app.get('/api/people', (req, res) => {
//     const data = fs.readFileSync(person_data, 'utf8')
//     const passed_data = JSON.parse(data)
//     // console.log("%c 🥔 passed_data", "color:#b03734", passed_data)
//     res.status(200).json({ success: true, data: passed_data })
// })
app.get('/api/people', (req, res) => {
    res.status(200).json(person_data)
})

// add - js data
// app.post('/api/postman/people', (req, res) => {
//     const { name } = req.body
//     if (!name) {
//       return res
//         .status(400)
//         .json({ success: false, msg: 'please provide name value' })
//     }
//     // data: [...people, name] - shows the body of the json in postman or insomia
//     res.status(201).json({ success: true, data: [...people, name] })
//   })

// add - json data
app.post('/api/people', bodyParser.json(), (req, res) => {
    person_data.push(req.body)
    fs.writeFile(
        './person.json',
        JSON.stringify(person_data, null, 2),
        (error) => {
          if (error) {
            throw error
          }
        }
    )
    res.json({
      status: "success",
      data: req.body,
    })
})

// update - js data  
// app.put('/api/people/:id', (req, res) => {
//     const { id } = req.params
//     const { name } = req.body
//     let read = fs.readFileSync(person_data, 'utf-8')
//     let send_data = JSON.parse(read)
//     const find_person = send_data.find((person) => person.id === id)
//     if(!find_person){ 
//         return res.status(400).json({ success: false, message: `no person with ${id}` })
//     } 
//     const new_person = find_person((person) => {
//         if(person.id === id){
//             person.name = name
//         }
//         return person
//     })    
//     res.status(201).send({ success: true, data: new_person })
// })

// update - json data  
// app.put('/api/people/:id', bodyParser.json(), (req, res) => {
//     const find_person = person_data.map((person) => {
//         if (person.id === req.params.id) {
//           return req.body
//         } else {
//           return person
//         }
//     })
//     fs.writeFile(
//         './person.json',
//         JSON.stringify(person_data, null, 2),
//         (error) => {
//           if (error) {
//             throw error
//           }
//         }
//     )
//     res.json({
//         status: "success",
//         data: req.body,
//     })
// })
app.put('/api/people/:id', (req, res) => {
    let file = fs.readFileSync('./person.json')
    let datas = JSON.parse(file)
    fs.readFile('./person.json', 'utf8', (err, data) => { 
        const accountId = req.params.id
        datas[accountId] = req.body
        const stringify_data = JSON.stringify(datas, null, 2)
        fs.writeFileSync('./person.json', stringify_data)
        res.send(`accounts with id ${accountId} has been updated`)
    }, true)
    res.json({
        status: "success",
        data: req.body,
      })
})

// delete - js data
// app.delete('/api/people/:id', (req, res) => {
//     const person = people.find((person) => person.id === Number(req.params.id))
//     if (!person) {
//       return res
//         .status(404)
//         .json({ success: false, msg: `no person with id ${req.params.id}` })
//     }
//     const newPeople = people.filter(
//       (person) => person.id !== Number(req.params.id)
//     )
//     return res.status(200).json({ success: true, data: newPeople })
//   })

// delete - json data
app.delete('/api/people/:id', (req, res) => {
    let id = req.params.id
    const file = fs.readFileSync( './person.json', 'utf-8')
    const data = JSON.parse(file)

    let filteredData = data.filter(items => items.id != id )
    const editFile = JSON.stringify(filteredData, null, 2)
    fs.writeFileSync( './person.json', editFile, 'utf-8')
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
 