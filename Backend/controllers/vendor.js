const Item = require("../models/item");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendor");
const Category = require("../models/category");
const mongoose = require("mongoose");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

// GET list of all items of that vendor
exports.getItems = async (req, res, next) => {
    const vendorId = req.user.userId;
    const items = await Item.find({ seller: vendorId });
    if (items) {
        return res.json({ success: true, message: "Items found successfully", items: items });
    } else {
        return res.json({ success: false, message: "Could not retrieve items" });
    }
};

// POST a item
exports.postAddItem = async (req, res, next) => {
    let { name, cost, category, description, userId } = req.body;

    const vendor = await Vendor.findById(userId).select("_id");
    if (!vendor) return res.json({ success: false, message: "Invalid vendor" });

    const __category__ = await Category.findOne({ name: category });
    if (!__category__) {
        return res.json({ success: false, message: "That category is not supported" });
    }

    // Check if product image is present
    const file = req.file;
    if (!file) {
        return res.json({ success: false, message: "No image file found" });
    }

    const result = await cloudinary.uploader.upload(file.path);

    let item = new Item({
        name: name,
        cost: parseFloat(cost),
        category: __category__._id,
        description: description,
        seller: vendor._id,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id
    });
    item = await item.save();

    if (!item) return res.json({ success: false, message: "Error creating that item" });

    return res.json({
        success: true,
        message: "Item added successfully",
        item: item
    });
};

// UPDATE the item given by Id and return the updated item
exports.putItem = async (req, res, next) => {
    let { name, cost, category, description } = req.body;

    // Check if the vendor is registered (error not possible using frontend)
    const vendor = await Vendor.findById(req.user.userId).select("_id");
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
        await cloudinary.uploader.destroy(product.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        updates.imageUrl = result.secure_url;
        updates.cloudinary_id = result.public_id;
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
    const product = await Item.findById(itemId);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    const item = await Item.findByIdAndDelete(itemId);
    if (item) {
        return res.json({ success: true, message: "Item removed successfully", item: item });
    } else {
        return res.json({ success: false, message: "Item Not Found" });
    }
};

// PUT the updated vendor and return updated vendor
exports.putVendor = async (req, res, next) => {
    let { name, email, contact } = req.body;
    // Check if the vendor is registered (error not possible using frontend)
    const vendor = await Vendor.findById(req.user.userId);
    if (!vendor) return res.json({ success: false, message: "Invalid vendor" });

    let updates = {};
    if (name) {
        updates.name = name;
    }
    if (email) {
        updates.email = email;
    }
    if (contact) {
        updates.contact = contact;
    }

    if (req.file) {
        if (vendor.cloudinary_id != undefined) {
            await cloudinary.uploader.destroy(vendor.cloudinary_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        updates.imageUrl = result.secure_url;
        updates.cloudinary_id = result.public_id;
    }
    let updatedVendor = await Vendor.findByIdAndUpdate(
        vendor._id,
        { $set: updates },
        { new: true }
    );
    if (updatedVendor) {
        return res.json({
            success: true,
            message: "Vendor details updated successfully",
            vendor: updatedVendor
        });
    } else {
        return res.json({ success: false, message: "Vendor details could not be updated" });
    }
};
