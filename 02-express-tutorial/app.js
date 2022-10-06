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

app.get('/api/products/:productID', (req, res) => {
    // console.log(req)
    // req.params - get ang request id from - :productID
    // console.log(req.params) 
    // const single_product = path_data.find(product => {
    //     const { id, name, image } = product
    //     return { id, name, image } 
    // })
    const { productID } = req.params

    const single_product = path_data.find(product => product.id === Number(productID))
    // console.log(single_product)

    // if ang single_product does not exist
    if(!single_product){
        return res.status(404).send('Hurot na sunod nlng')
    }
    
    // single json data
    return res.json(single_product)
})

// route parameter complex approach multiple id parameter
// app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
//     console.log(req)
//     // console.log(req.params)
//     res.send('hello world')
// })


app.listen(5000, () => {
    console.log('listening on port 5000')
})