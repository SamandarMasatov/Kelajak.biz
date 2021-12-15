const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    position: {
        type: String, required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model('Team', teamSchema)