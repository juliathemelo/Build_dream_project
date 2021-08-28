const Memory = require('../models/memory')
const mongoose = require('mongoose')

const getAllMemory = async (req, res) => {
    const memory = await Memory.find()

    if (memory.length == 0) {
        res.status(204).send({ message: "No memory found"})
    }

    res.status(200).send(memory)
}

const createMemory = async (req, res) => {
    const memory = new Memory({
        _id: new mongoose.Types.ObjectId(),
        marca: req.body.marca,
        modelo: req.body.modelo,
        capacidade: req.body.capacidade,
        preco: req.body.preco
    })

    const verification = await Memory.findOne({ modelo: req.body.modelo })

    if (verification) {
        res.status(409).send({ message: `Memory ${req.body.modelo} is already exists`})
    } else {
        try {
            const newMemory = await Memory.insertMany(memory)
            res.status(201).json(newMemory)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updateMemory = async (req, res) => {
    const requestId = req.params.id
    Memory.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Memory.updateOne({ _id: requestId }, {$set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully update"})
                    }
                })
            } else {
                res.status(404).send({ message: "No memory found" })
            }
        }
    })
}

const deleteMemory = (req, res) => {
    const requestId = req.params.id;
    Memory.findOne({ _id: requestId }, function (err, memoryFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (memoryFound) {
                Memory.deleteOne({ _id: requestId }, function (err) {
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
    getAllMemory,
    createMemory,
    updateMemory,
    deleteMemory
}