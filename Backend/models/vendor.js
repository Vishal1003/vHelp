const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
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
    image: {
        data: Buffer,
        contentType: String
    }
});
const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
