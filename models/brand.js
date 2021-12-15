const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    image: { type: String, required: true,  },
    name: { type: String, required: true,  }
});

module.exports = mongoose.model('Brand', brandSchema); 