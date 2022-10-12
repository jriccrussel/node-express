const express = require('express')
const router = express.Router()

const person_data = require('../person.json')

router.get('/', (req, res) => {
    res.status(200).json(person_data)
})

// add - json data
router.post('/', bodyParser.json(), (req, res) => {
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

// update - json data
router.put('/:id', (req, res) => {
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

// delete - json data
router.delete('/:id', (req, res) => {
    let id = req.params.id
    const file = fs.readFileSync( './person.json', 'utf-8')
    const data = JSON.parse(file)

    let filteredData = data.filter(items => items.id != id )
    const editFile = JSON.stringify(filteredData, null, 2)
    fs.writeFileSync( './person.json', editFile, 'utf-8')
})

module.exports = router

