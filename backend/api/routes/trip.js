const express = require('express');
const router = express.Router();
const userController = require('./../controller/user')
const tripController = require('./../controller/trip')
const checkerAuth  = require('./../../middleware/check-auth')
const checkerPermission = require('./../../middleware/check-permissions')


router.get('/all', tripController.getAll)
router.get('/:tripId', tripController.getById)
router.post('/create', checkerAuth, tripController.create)
router.post('/:tripId', checkerAuth, tripController.update)
router.delete('/:tripId', checkerAuth, tripController.delete)

module.exports = router
