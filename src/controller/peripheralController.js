const Peripheral = require('../models/peripheral')
const mongoose = require('mongoose')

const getAllPeripheral = async (req, res) => {
    const peripheral = await Peripheral.find()

    if (peripheral.length == 0) {
        res.status(204).send({ message: "No peripheral found"})
    }

    res.status(200).send(peripheral)
}

const createPeripheral = async (req, res) => {
    const peripheral = new Peripheral({
        _id: new mongoose.Types.ObjectId(),
        tipo: req.body.tipo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        usb: req.body.usb,
        descricao: req.body.descricao,
        preco: req.body.preco
    })

    const verification = await Peripheral.findOne({ modelo: req.body.modelo, tipo: req.body.tipo })

    if (verification) {
        res.status(409).send({ message: `Peripheral ${req.body.modelo} is already exists`})
    } else {
        try {
            const newPeripheral = await Peripheral.insertMany(peripheral)
            res.status(201).json(newPeripheral)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updatePeripheral = async (req, res) => {
    const requestId = req.params.id
    Peripheral.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Peripheral.updateOne({ _id: requestId }, {$set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully update"})
                    }
                })
            } else {
                res.status(404).send({ message: "No peripheral found" })
            }
        }
    })
}

const deletePeripheral = (req, res) => {
    const requestId = req.params.id;
    Peripheral.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Peripheral.deleteOne({ _id: requestId }, function (err) {
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
    getAllPeripheral,
    createPeripheral,
    updatePeripheral,
    deletePeripheral
}