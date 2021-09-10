const Computer = require('../models/computer')
const Processor = require('../models/processor')
const Memory = require('../models/memory')
const Peripheral = require('../models/peripheral')
const Motherboard = require('../models/motherboard')
const mongoose = require('mongoose')

const getAllComputer = async (req, res) => {
    const computer = await Computer.find()
    .populate('motherboard')
    .populate('processor')
    .populate('memory')
    .populate('peripheral')
    
    if (computer.length == 0) {
        res.status(204).send({ computer: "No computer found"})
    }

    res.status(200).send(computer)
}

const getAllItems = async (req,res) => {
    const memory = await Memory.find()
    const processor = await Processor.find()
    const peripheral = await Peripheral.find()
    const motherboard = await Motherboard.find()

    res.status(200).send({memory, processor, peripheral, motherboard})
}

const createComputer = async (req, res) => {

    const processorPrice = await Processor.findOne({ _id: req.body.processor })
    const memoryPrice = await Memory.findOne({ _id: req.body.memory })
    const peripheralPrice = await Peripheral.findOne({ _id: req.body.peripheral })
    const motherboardPrice = await Motherboard.findOne({ _id: req.body.motherboard })

    const totalPrice = (processorPrice.preco + memoryPrice.preco + peripheralPrice.preco + motherboardPrice.preco)

    const computer = new Computer({
        _id: new mongoose.Types.ObjectId(),
        comprador: req.body.comprador,
        processor: req.body.processor,
        memory: req.body.memory,
        motherboard: req.body.motherboard,
        peripheral: req.body.peripheral,
        total: totalPrice
    })

    

    const verification = await Computer.findOne({ comprador: req.body.comprador })

    if (verification) {
        res.status(409).send({ message: `Computer ${req.body.comprador} is already exists`})
    } else {
        try {
            const newComputer = await Computer.insertMany(computer)
            res.status(201).json(newComputer)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updateComputer = async (req, res) => {
    const requestId = req.params.id

    Computer.findOne({ _id: requestId }, function (err, computerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (computerFound) {
                const processorPrice = await Processor.findOne({ _id: req.body.processor })
                const memoryPrice = await Memory.findOne({ _id: req.body.memory })
                const peripheralPrice = await Peripheral.findOne({ _id: req.body.peripheral })
                const motherboardPrice = await Motherboard.findOne({ _id: req.body.motherboard })

                const totalPrice = (processorPrice.preco + memoryPrice.preco + peripheralPrice.preco + motherboardPrice.preco)
                Computer.updateOne({ _id: requestId, total: totalPrice}, {$set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Successfully update"})
                    }
                })
            } else {
                res.status(404).send({ message: "No computer found" })
            }
        }
    })
}

const deleteComputer = (req, res) => {
    const requestId = req.params.id;
    Computer.findOne({ _id: requestId }, function (err, computerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (computerFound) {
                Computer.deleteOne({ _id: requestId }, function (err) {
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
    getAllComputer,
    getAllItems,
    createComputer,
    updateComputer,
    deleteComputer
}