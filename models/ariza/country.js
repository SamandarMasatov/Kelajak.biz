const mongoose = require('mongoose');

const davlat = mongoose.Schema({
    image: { type: String, required: true,  },
    name: { type: String, required: true,  },
    date: { type: Date, default: Date.now() } 
});

module.exports = mongoose.model("country", davlat);