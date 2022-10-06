const express = require('express')
const fs = require('fs')
const app = express()
const { products } = require('./data')
const path_data = './data.json'

app.get('/', (req, res) => {
    // using js data
    // res.json([{ name: 'angels burger kollera'}, { name: 'asa na diay ko dapita' }])

    // using json data
    const data = fs.readFileSync(path_data, 'utf8')
    const passing_data = JSON.parse(data)
    res.send(passing_data)
})

app.all('*', (req, res) => {
    res.status(404).json({ error: 'error json' })
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})