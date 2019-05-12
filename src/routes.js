const express = require('express')
const router = express.Router()
const cors = require('cors');

const controller = require('./controllers/pois.js')
const auth = require('./middleware/auth')

router.all('*', cors());

router.post('/pois', auth, controller.createPoi) // add poi
router.get('/pois/:id', auth, controller.getPoi) // get poi by id
router.patch('/pois/:id', auth, controller.updatePoi) // modify poi
router.delete('/pois/:id', auth, controller.deletePoi) // delete poi

router.post('/accounts/login', controller.login) // login
router.post('/accounts/logout', auth, controller.logout) // logout
router.post('/accounts', controller.createAccount)  // signup

router.get('/pois',controller.getAllPois) // all pois
router.get('/pois/location/:location', controller.getLocation) // pois that match location
router.get('/pois/location/:location/type/:type',controller.getLocationType) // pois that match location & type
router.get('/pois/type/:type', controller.getType) // pois that match type

module.exports = router