const express = require('express')
const app = express()

// root and home page ni cya
app.get('/', (req, res) => {
    console.log('u visited the home page')
    res.status(200).send('Home page ni cya')
})

// about page
app.get('/about', (req, res) => {
    console.log('u visited the about page')
    res.status(200).send('about page ni cya')
})

// handle sa error page
app.all('*', (req, res) => {
    console.log('u visited the error page')
    res.status(404).send('<h1>Na wala ang page</h1>')
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
