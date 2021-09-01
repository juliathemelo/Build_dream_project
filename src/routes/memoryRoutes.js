const express = require('express')
const controller = require('../controller/memoryController')

const router = express.Router()

router.get('/', controller.getAllMemory)

router.get('/filter/min', controller.getMinPrice)

router.get('/filter/max', controller.getMaxPrice)

router.post('/', controller.createMemory)

router.put('/:id', controller.updateMemory)

router.delete('/:id', controller.deleteMemory)

module.exports = router