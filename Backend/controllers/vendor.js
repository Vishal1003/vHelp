const Item = require("../models/item");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendor");
const Category = require("../models/category");
const mongoose = require("mongoose");
const fs = require("fs");

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

// GET list of all items of that vendor
exports.getItems = async (req, res, next) => {
    const vendorId = req.user.vendorId;
    const items = await Item.find({ seller: vendorId });
    if (items) {
        return res.json({ success: true, message: "Items found successfully", items: items });
    } else {
        return res.json({ success: false, message: "Could not retrieve items" });
    }
};

// POST a item
exports.postAddItem = async (req, res, next) => {
    let { name, cost, category, description } = req.body;
    // Check if the vendor is registered (error not possible using frontend)
    const vendor = await Vendor.findById(req.user.vendorId).select("_id");
    if (!vendor) return res.json({ success: false, message: "Invalid vendor" });

    // Check if the category is supported (error not possible using frontend)
    const __category__ = await Category.findOne({ name: category });
    if (!__category__) {
        return res.json({ success: false, message: "That category is not supported" });
    }

    // Check if product image is present
    const file = req.file;
    if (!file) {
        return res.json({ success: false, message: "No image file found" });
    }

    let item = new Item({
        name: name,
        cost: parseFloat(cost),
        category: __category__._id,
        description: description,
        seller: vendor._id
    });
    item.image.data = fs.readFileSync(file.path);
    item.image.contentType = file.mimetype;
    item = await item.save();

    if (!item) return res.json({ success: false, message: "Error creating that item" });

    res.json({
        success: true,
        message: "Item added successfully",
        item: item
    });
};

// UPDATE the item given by Id and return the updated item
exports.putItem = async (req, res, next) => {
    let { name, cost, category, description } = req.body;

    // Check if the vendor is registered (error not possible using frontend)
    const vendor = await Vendor.findById(req.user.vendorId).select("_id");
    if (!vendor) return res.json({ success: false, message: "Invalid vendor" });

    // Check if the category is supported (error not possible using frontend)
    const __category__ = await Category.findOne({ name: category });
    if (!__category__) {
        return res.json({ success: false, message: "That category is not supported" });
    }

    // Check if product image is present
    const file = req.file;
    if (!file) {
        return res.json({ success: false, message: "No image file found" });
    }

    const itemId = req.params.id;
    if (!isValidId(itemId)) {
        return res.json({ success: false, message: "Invalid item id" });
    }
    const product = await Item.findById(itemId);
    if (!product) return res.json({ success: false, message: "No item found" });
    let updates = {};
    if (name) {
        updates.name = name;
    }
    if (cost) {
        updates.cost = cost;
    }
    if (category) {
        updates.category = __category__._id;
    }
    if (description) {
        updates.description = description;
    }
    if (req.file) {
        updates.image = {};
        updates.image.data = fs.readFileSync(req.file.path);
        updates.image.contentType = req.file.mimetype;
    }
    let item = await Item.findByIdAndUpdate(itemId, { $set: updates }, { new: true });
    if (item) {
        return res.json({ success: true, message: "Item updated successfully", item: item });
    } else {
        return res.json({ success: false, message: "Item not found" });
    }
};

// DELETE the item given by Id and return the removed item
exports.deleteItem = async (req, res, next) => {
    const itemId = req.params.id;
    if (!isValidId(itemId)) {
        return res.json({ success: false, message: "Invalid Item Id" });
    }
    const item = await Item.findByIdAndDelete(itemId);
    if (item) {
        return res.json({ success: true, message: "Item removed successfully", item: item });
    } else {
        return res.json({ success: false, message: "Item Not Found" });
    }
};
