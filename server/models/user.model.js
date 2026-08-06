const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },role:{
            type: String,
            enum:["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
    }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("user", UserSchema);