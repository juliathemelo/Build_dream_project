const mongoose = require('mongoose')

const motherboardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    compativel: {
        type: String,
        required: true
    },
    usb: {
        type: Boolean,
        required: true
    },
    preco: {
        type: Number,
        required: false
    }
},{
    versionKey: false
})

module.exports = mongoose.model('motherboard', motherboardSchema)