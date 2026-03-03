const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "author", "editor", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true}
);

module.exports = mongoose.model("User", userSchema);