const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor"
    }
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
