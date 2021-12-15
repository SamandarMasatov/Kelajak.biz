const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    video: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);