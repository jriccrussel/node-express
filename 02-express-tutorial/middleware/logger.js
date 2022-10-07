// whenever using sa middleware always pass it to the 'next' middleware 
// next() - ato pass to the next function/method(app.get); in this case pass nato to next function/method "app.get('/', (req, res) => {})"
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    // res.send('Testing')
    next()
}

module.exports = logger