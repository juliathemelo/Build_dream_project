const mongoose = require('mongoose')

const computerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comprador: {
        type: String,
        required: true
    },
    motherboard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'motherboard'
    },
    processor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'processor'
    },
    memory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'memory'
    },
    peripheral: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'peripheral'
    },
    total: {
        type: Number,
        required: false
    }
},{
    versionKey: false
})

module.exports = mongoose.model('computer', computerSchema)