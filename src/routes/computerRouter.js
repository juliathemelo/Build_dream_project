const express = require('express')
const controller = require('../controller/computerController')

const router = express.Router()

router.get('/', controller.getAllComputer)

router.get('/all', controller.getAllItems)

router.post('/', controller.createComputer)

router.put('/:id', controller.updateComputer)

router.delete('/:id', controller.deleteComputer)

module.exports = router