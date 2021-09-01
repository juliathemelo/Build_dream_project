const express = require('express')
const controller = require('../controller/processorController')

const router = express.Router()

router.get('/', controller.getAllProcessor)

router.get('/filter/min', controller.getMinPrice)

router.get('/filter/max', controller.getMaxPrice)

router.post('/', controller.createProcessor)

router.put('/:id', controller.updateProcessor)

router.delete('/:id', controller.deleteProcessor)

module.exports = router