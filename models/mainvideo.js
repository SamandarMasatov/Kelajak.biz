const mongoose = require('mongoose');


const MainVideoSchema = mongoose.Schema({
    video: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Videos', MainVideoSchema);