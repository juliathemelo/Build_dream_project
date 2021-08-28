const mongoose = require('mongoose')

const memorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    capacidade: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: false
    }
},{
    versionKey: false
})

module.exports = mongoose.model('memory', memorySchema)