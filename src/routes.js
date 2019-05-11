const express = require('express')
const router = express.Router()
const cors = require('cors');

const controller = require('./controllers/pois.js')
const auth = require('./middleware/auth')

router.all('*', cors());

/*
router.post('/:username/:password/pois', controller.getPois)
router.get('/:username/:password/pois/:id', controller.getPoi)
router.patch('/:username/:password/pois/:id', controller.createPoi)
router.delete('/:username/:password/pois/:id', controller.deletePoi)
*/

// functions that require auth middleware

router.post('/pois', auth, controller.createPoi) // add poi
router.get('/pois/:id', auth, controller.getPoi) // get poi by id
router.patch('/pois/:id', auth, controller.updatePoi) // modify poi
router.delete('/pois/:id', auth, controller.deletePoi) // delte poi

router.post('/accounts/login', controller.login) // login
router.post('/accounts/logout', auth, controller.logout) // logout
router.post('/accounts', controller.createAccount)  // signup

router.get('/pois',controller.getAllPois) // all pois
router.get('/pois/location/:location', controller.getLocation) // pois that match location
router.get('/pois/location/:location/type/:type',controller.getLocationType) // pois that match location & type
router.get('/pois/type/:type', controller.getType) // pois that match type

module.exports = router