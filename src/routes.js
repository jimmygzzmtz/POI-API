const express = require('express')
const router = express.Router()

const controller = require('./controllers/users.js')
// const auth = require('./middleware/auth')

router.post('/:username/:password/pois', controller.getPois)
router.get('/:username/:password/pois/:id', controller.getPoi)
router.patch('/:username/:password/pois/:id', controlller.createPoi)
router.delete('/:username/:password/pois/:id', controller.deletePoi)
router.get('/pois',controller.getAllPois)
router.get('/pois/location/:location', controller.getLocation)
router.get('/pois/location/:location/type/:type',controller.getLocationType)
router.get('/pois/type/:type', controller.getType)

module.exports = router