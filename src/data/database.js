const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGODB_URI

const connect = () => {
    mongoose.connect(MONGO_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Database connect')
    ).catch(err => console.err)
}

module.exports = { connect }