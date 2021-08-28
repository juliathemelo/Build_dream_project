const express = require('express')
const controller = require('../controller/peripheralController')

const router = express.Router()

router.get('/', controller.getAllPeripheral)

router.post('/', controller.createPeripheral)

router.put('/:id', controller.updatePeripheral)

router.delete('/:id', controller.deletePeripheral)

module.exports = router