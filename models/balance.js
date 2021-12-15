const mongoose = require('mongoose')


const myBalance =  mongoose.Schema({
    userID: {
        type : mongoose.Schema.ObjectId,
        ref: 'User',
        required : true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        index: true
    },
     date: {
        type: Date,
        default: Date.now()
         },

})
module.exports = mongoose.model('my_balance', myBalance)