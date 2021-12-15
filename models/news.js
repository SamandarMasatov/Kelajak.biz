const mongoose = require('mongoose');

const newsModel = mongoose.Schema({
title: { type: String, required: true  },
description: { type: String, required: true  },
image: { type: String, required: true  },
counter: { type: Number, default: 0 },
tag: { type: String, required: true  },
date: { type: Date, default: Date.now() }

});

module.exports = mongoose.model('News', newsModel);