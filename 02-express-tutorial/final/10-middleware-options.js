const logger = require( './middleware/logger')
const authorize = require( './middleware/authorize')
const express = require('express')
const app = express()
const fs = require('fs')
const { products } = require('./data')
const path_data = require('./data.json')
// thirda party middleware
const morgan = require('morgan')

// to access 'logger' - pass nato as second argument sa 'app.get'
// app.get('/', logger, (req, res) => {
//     res.send('Home')
// })

// para ma use ang middleware sa tanan na route gamit ta ug 'app.use' then pasa ang middleware na logger 'app.use(logger)'
// app.use(logger)

// ang 1st argument sa 'app.use' kai path, since naa path kato naa path na '/api' kato rai naa access sa middleware and the rest na for Home, About wala access sa middleware
// app.use('/api', logger)

// app.use applies the middleware to all the routes
// to access multiple middleware function sa app.use we need to put ang middleware in an array
// execution sa middleware is in order if logger ang mag una so cya mu una execute and right after ana ang authorize napud ang ma execute
app.use([logger, authorize])

// req => middleware => res

// 1. use vs route 
// 2. options - our own / express / third party
// logger & authorize - ouw own middleware
// app.use(express.static('./public')) // - express
app.use(morgan('tiny')) // - third party middleware | - milisecond timer

// after na set ang 'app.use(logger)' then pwdi na dayon e remove ang logger sa may 2nd arguement sa 'app.get' 
app.get('/', (req, res) => {
    res.send('Home')
})
// if ang 'app.use(logger)' na tawag after or below app.get (for Home); from 'app.use(logger)' up until to (app.get for Items) ang naa access sa middleware so ang app.get for home will not have access sa middleware 
// app.use(logger)

app.get('/about', (req, res) => {
    console.log(req.user)
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
