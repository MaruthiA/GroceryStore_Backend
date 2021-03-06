var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);