const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const moderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'moderator'
    },
});

moderSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

moderSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model('Moderator', moderSchema)