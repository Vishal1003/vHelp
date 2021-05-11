const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
    imageUrl: {
        type : String
    },
    cloudinary_id: {
        type: String
    },
    contact : {
        type : String,
        required : true
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
