const express = require('express')
const controller = require('../controller/motherboardController')

const router = express.Router()

router.get('/', controller.getAllMotherboard)

router.get('/:id', controller.getCompatible)

router.post('/', controller.createMotherboard)

router.put('/:id', controller.updateMotherboard)

router.delete('/:id', controller.deleteMotherboard)

module.exports = router