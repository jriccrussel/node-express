const express = require('express')
const path = require('path')
const app = express()

// setup static and middleware - app.use
// find or give root path para ma work ang css file and javascript file sa index.html
// express.static - a middleware, para ang server does'nt have to change anything sa path to the app or sa index.html
// to serve or serving or to provide the files to the app or index.html
app.use(express.static('./navbar-app/public')) 

// app.get is consider static we basically pointing to index.html so there okay ra cya e comment then copy & paste index.html to public folder
// app.get('/', (req, res) => {
//     // path.resolve and path.join is par iha as long as naka point cyaa to __dirname
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

app.all('*', (req, res) => {
    res.status(404).send('page na wala')
})
 
app.listen(5000, () => {
    console.log('listening on port 5000')
})