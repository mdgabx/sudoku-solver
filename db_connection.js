const mongoose = require('mongoose')
const db = mongoose.connect(process.env.MONGO_URI)

if(!db) {
    console.log('Error connectting to the DB')
} else {
    console.log('Successfully connected to the DB')
}

module.exports = db