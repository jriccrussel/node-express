const { readFileSync } = require('fs')
const http = require('http')

// get all the files 
const home_page = readFileSync('./index.html')

const server = http.createServer((req, res) => {
    // console.log('user hit the server') 
    // req or request - mag request or ngayo sa server
    // res or response - mag send sa server 
    // res.writeHead - add meta data or description sa ato response like status or what type of content type
    // text/plain and text/html - are MIME(IANA) types supported by the server or unsai gusto pa display from the server to the client or sa end user
    // res.writeHead(200, { 'content-type': 'text/plain' }) // text/plain -renders nya as a code
    // res.writeHead(200, { 'content-type': 'text/html' }) // text/html - renders as html
    // res.write - pass nato sa atong header & body from the server
    // res.write('<h1>Home page</h1>')
    // console.log(req)
    // console.log(req.method)
    // console.log(req.url)

    const url = req.url
    // home page
    if(url === '/'){
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(home_page)
        // res.write('<h1>Home page</h1>')
        res.end()
    } 
    // about page
    else if(url === '/about'){
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>About page</h1>')
        res.end()
    }
    // 404 page
    else{
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Page Not Found</h1>')
        res.end()
    }
    // res.end('<h1>Home page</h1>')
    // res.end()
})

server.listen(5000)