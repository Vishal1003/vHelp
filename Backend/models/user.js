const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        postal_code: String,
        country: String
    },
    image: {
        data: Buffer,
        contentType: String
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
