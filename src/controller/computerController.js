const Computer = require('../models/computer')
const Processor = require('../models/processor')
const Memory = require('../models/memory')
const Peripheral = require('../models/peripheral')
const mongoose = require('mongoose')

const getAllComputer = async (req, res) => {
    const computer = await Computer.find()
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

    res.status(200).send({memory, processor, peripheral})
}

const createComputer = async (req, res) => {
    const computer = new Computer({
        _id: new mongoose.Types.ObjectId(),
        comprador: req.body.comprador,
        processor: req.body.processor,
        memory: req.body.memory,
        motherboard: req.body.motherboard,
        peripheral: req.body.peripheral
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

module.exports = {
    getAllComputer,
    getAllItems,
    createComputer
}