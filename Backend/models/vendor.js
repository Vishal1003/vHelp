const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
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
    imageUrl: {
        type : String,
    },
    contact : {
        type : String,
        required : true
    }
});
const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
