const express = require('express')
const router = express.Router()

router.use(cors())

router.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

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