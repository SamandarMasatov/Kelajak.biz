const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
// course_ID: { type: mongoose.Schema.ObjectId, 
//     ref: "Course", 
//     required: true}, 
username: {
    type: mongoose.Schema.ObjectId, 
    ref: "User", 
    required: true,
    index: true
 },
phone: { type: String, required: true },
message: { type: String, required: true },  
watch: { type: String, enum: ["seen", "unseen"], default: "unseen" },  
date: { type: Date, default: Date.now() }

});

module.exports = mongoose.model('Contact', contactSchema);
