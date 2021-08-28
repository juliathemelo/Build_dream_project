const mongoose = require('mongoose')

const processorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    tipo: {
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

module.exports = mongoose.model('processor', processorSchema)