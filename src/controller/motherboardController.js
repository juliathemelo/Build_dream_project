const Motherboard = require('../models/motherboard')
const Processor = require('../models/processor')
const Peripheral = require('../models/peripheral')
const mongoose = require('mongoose')

const getAllMotherboard = async (req, res) => {
    const motherboard = await Motherboard.find()

    if (motherboard.length == 0) {
        res.status(204).send({ message: "No motherboard found"})
    }

    res.status(200).send(motherboard)
}

const getCompatible = async (req, res) => {
    const requestId = req.params.id
    const compatible = await Motherboard.findOne({ _id: requestId })
    const processor = await Processor.find({ marca: compatible.compativel })
    if (processor.length != 0) {
        res.status(200).send({'Processadores Compatíveis': processor})
    }
    res.send({'not found': 'Does not have a compatible processor'})
    
}

const getUSBperipheral = async (req, res) => {
    const peripheral = await Peripheral.find({ usb: true })
    if (peripheral != false) {
        res.status(200).send({'Perifericos Compatíveis': peripheral})
    }
    res.send({'not found': 'Does not have a compatible processor'})
    
}

const getMinPrice = async (req, res) => {
    const motherboard = await Motherboard.find()

    if (motherboard.length == 0) {
        res.status(204).send({ message: "No motherboard found"})
    }

    const minPrice = motherboard.sort( function (a,b) {
        return (a.preco > b.preco) ? 1 : ((b.preco > a.preco) ? -1 : 0);
    })

    res.status(200).send(minPrice)
}

const getMaxPrice = async (req, res) => {
    const motherboard = await Motherboard.find()

    if (motherboard.length == 0) {
        res.status(204).send({ message: "No motherboard found"})
    }

    const maxPrice = motherboard.sort( function (a,b) {
        return (a.preco < b.preco) ? 1 : ((b.preco < a.preco) ? -1 : 0);
    })

    res.status(200).send(maxPrice)
}

const createMotherboard = async (req, res) => {
    const motherboard = new Motherboard({
        _id: new mongoose.Types.ObjectId(),
        marca: req.body.marca,
        modelo: req.body.modelo,
        compativel: req.body.compativel,
        preco: req.body.preco
    })

    const verification = await Motherboard.findOne({ modelo: req.body.modelo })

    if (verification) {
        res.status(409).send({ message: `Motherboard ${req.body.modelo} is already exists`})
    } else {
        try {
            const newMemory = await Motherboard.insertMany(motherboard)
            res.status(201).json(newMemory)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updateMotherboard = async (req, res) => {
    const requestId = req.params.id
    Motherboard.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Motherboard.updateOne({ _id: requestId }, {$set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully update"})
                    }
                })
            } else {
                res.status(404).send({ message: "No motherboard found" })
            }
        }
    })
}

const deleteMotherboard = (req, res) => {
    const requestId = req.params.id;
    Motherboard.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Motherboard.deleteOne({ _id: requestId }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully delete" })
                    }
                })
            } else {
                res.status(404).send({ message: "No processor found" });
            }
        }
    })
}

module.exports = {
    getAllMotherboard,
    getMinPrice,
    getMaxPrice,
    createMotherboard,
    updateMotherboard,
    deleteMotherboard,
    getCompatible,
    getUSBperipheral
}