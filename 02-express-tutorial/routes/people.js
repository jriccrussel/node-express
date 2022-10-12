const express = require('express')
const router = express.Router()

const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
} = require('../controllers/people')

const person_data = require('../person.json')

// callback method
// router.get('/', getPeople)
// router.post('/', bodyParser.json(), createPerson)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// chain method
// router.get('/').get(getPeople).post(createPerson)
router.get('/').get(getPeople)
router.post('/', bodyParser.json()).post(createPerson)
router.delete('/:id').put(deletePerson).delete(deletePerson)

module.exports = router

