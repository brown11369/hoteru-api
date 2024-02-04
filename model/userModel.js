const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: [{
            token: {
                type: String,
                required: true
            },
            expiresIn: {
                type: Date,
                required: true
            }
        }]
    }
}, { timestamps: true })


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;