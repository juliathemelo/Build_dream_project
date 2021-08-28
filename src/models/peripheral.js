const mongoose = require('mongoose')

const peripheralSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    usb: {
        type: Boolean,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    preco: {
        type: Number,
        required: false
    }
},{
    versionKey: false
})

module.exports = mongoose.model('peripheral', peripheralSchema)