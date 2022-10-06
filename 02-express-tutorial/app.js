const express = require('express')
const fs = require('fs')
const app = express()
const { products } = require('./data')
const path_data = require('./data.json')

app.get('/', (req, res) => {
    res.status(200).send('<h1>Home Page</h1><br/><a href="/api/products">products</a>')
}) 

app.get('/api/products', (req, res) => {
    const new_product = path_data.map(product => {
        const { id, name, image } = product
        return { id, name, image }
    })

    // new json data
    res.json(new_product)
    
    // json data
    // res.json(path_data)

    // js data
    // res.json(products)    
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})