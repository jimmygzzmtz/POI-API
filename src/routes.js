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

router.post('/pois', auth, controller.getPois)
router.get('/pois/:id', auth, controller.getPoi)
router.patch('/pois/:id', auth, controller.createPoi)
router.delete('/pois/:id', auth, controller.deletePoi)

router.post('/accounts/login', controller.login)
router.post('/accounts/logout', auth, controller.logout)
router.post('/accounts', controller.createAccount)  // signup

router.get('/pois',controller.getAllPois)
router.get('/pois/location/:location', controller.getLocation)
router.get('/pois/location/:location/type/:type',controller.getLocationType)
router.get('/pois/type/:type', controller.getType)

module.exports = router