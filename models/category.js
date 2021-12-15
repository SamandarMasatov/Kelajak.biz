const mongoose = require('mongoose');

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date, default:  Date.now()
    }
});


module.exports = mongoose.model("Category", Category);