const authorize = (req, res, next) => {
    const { user } = req.query

    // if ang query is equal to user then display ang json data john sa browser
    // if(user === 'john'){
    if(user === user){
        // req.user = { name: 'john', id: 3 }
        req.user = { name: user, id: 3 }
        next()
    } else{
        res.status(401).send('Unauthorized')
    }

    // check if mo work ang authorize to all routes
    // console.log('authorize')
    // next()
}

module.exports = authorize

