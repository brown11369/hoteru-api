const { default: mongoose } = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        roleName:{
            type:String,
            default:"noob"
        },
        roles: {
            type: [Number],
            default:[2050]
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
)

const adminModel = mongoose.model("admins", adminSchema);

module.exports = adminModel;