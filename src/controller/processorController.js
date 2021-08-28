const Processor = require('../models/processor')
const mongoose = require('mongoose')

const getAllProcessor = async (req, res) => {
    const processor = await Processor.find()

    if (processor.length == 0) {
        res.status(204).send({ message: "No processor found"})
    }

    res.status(200).send(processor)
}

const createProcessor = async (req, res) => {
    const processor = new Processor({
        _id: new mongoose.Types.ObjectId(),
        marca: req.body.marca,
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        preco: req.body.preco
    })

    const verification = await Processor.findOne({ modelo: req.body.modelo })

    if (verification) {
        res.status(409).send({ message: `Processor ${req.body.modelo} is already exists`})
    } else {
        try {
            const newProcessor = await Processor.insertMany(processor)
            res.status(201).json(newProcessor)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updateProcessor = async (req, res) => {
    const requestId = req.params.id
    Processor.findOne({ _id: requestId }, function (err, processorFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (processorFound) {
                Processor.updateOne({ _id: requestId }, {$set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully update"})
                    }
                })
            } else {
                res.status(404).send({ message: "No processor found" })
            }
        }
    })
}

const deleteProcessor = (req, res) => {
    const requestId = req.params.id;
    Processor.findOne({ _id: requestId }, function (err, processorFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (processorFound) {
                Processor.deleteOne({ _id: requestId }, function (err) {
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
    getAllProcessor,
    createProcessor,
    updateProcessor,
    deleteProcessor
}