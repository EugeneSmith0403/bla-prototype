const express = require('express');
const router = express.Router();
const bookController = require('./../controller/booking')
const checkerAuth  = require('./../../middleware/check-auth')
const checkerPermission = require('./../../middleware/check-permissions')

router.post('/apply', checkerAuth, bookController.apply)
router.post('/pending', checkerAuth, bookController.pending)
router.post('/cancel', checkerAuth, bookController.cancel)

module.exports = router
