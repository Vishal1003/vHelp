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
    image: {
        data: Buffer,
        contentType: String
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor"
    }
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
