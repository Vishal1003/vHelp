const Item = require("../models/item");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { base } = require("../models/item");

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function normalize(str) {
    return str.trim().toLowerCase();
}

exports.getLogin = async (req, res, next) => {
    res.status(404).send("To be implemented");
};

exports.postLogin = async (req, res, next) => {
    let { email, password } = req.body;
    const vendor = await Vendor.findOne({ email: normalize(email) });
    if (!vendor) {
        return res.status(401).send("Email or Password does not match!");
    }
    if (bcrypt.compareSync(password, vendor.password)) {
        const token = jwt.sign({ vendorId: vendor._id, isVendor: true }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        // res.cookie('jwt', token, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        return res.status(200).json({
            token: token,
            message: "Logged in successfully!"
        });
    } else {
        return res.status(401).send("Email or Password does not match!");
    }
};

exports.postRegister = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        let vendor = await Vendor.findOne({ email: normalize(email) });
        if (vendor) return res.status(404).send("Vendor already registered with that emailId");

        const hashedPassword = await bcrypt.hash(password, 8);
        vendor = new Vendor({
            name: normalize(name),
            email: normalize(email),
            password: hashedPassword
        });

        vendor = await vendor.save();
        if (!vendor) return res.status(400).send("Vendor cannot be registered!");
        res.status(200).send(vendor);
    } catch (err) {
        throw err;
    }
};

// GET list of all items of that vendor
exports.getItems = async (req, res, next) => {
    const vendorId = req.user.vendorId;
    const items = await Item.find({ seller: vendorId });
    if (items) {
        return res.status(200).json({ items: items });
    } else {
        return res.status(400).send("Could not retrieve items!");
    }
};

// POST a item
exports.postAddItem = async (req, res, next) => {
    let { name, cost, category } = req.body;
    const vendor = await Vendor.findById(req.user.vendorId).select("_id");
    if (!vendor) return res.status(404).send("No vendor found!");

    const file = req.file;
    if (!file) return res.status(400).json({ success: false, message: "No image file found" });

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    console.log(fileName, basePath);

    let item = new Item({
        name: normalize(name),
        cost: parseFloat(normalize(cost)),
        category: normalize(category),
        imageUrl: `${basePath}${fileName}`,
        seller: vendor._id
    });

    item = await item.save();

    if (!item) return res.status(400).send("Error creating that item");

    res.status(200).json({ message: "Item Added Successfully", item: item });
};

// UPDATE the item given by Id and return the updated item
exports.putItem = async (req, res, next) => {
    let { name, cost, category } = req.body;
    const vId = req.user.vendorId;
    const vendor = await Vendor.findById(vId).select("_id");
    if (!vendor) return res.status(404).send("No vendor found!");

    const itemId = req.params.id;
    if (!isValidId(itemId)) {
        return res.status(400).json({ message: "Invalid Item Id" });
    }
    const product = await Item.findById(itemId);
    if (!product) return res.status(400).json({ success: false, message: "No item found!" });
    let updates = {};
    if (name) {
        name = normalize(name);
        updates.name = name;
    }
    if (cost) {
        cost = normalize(cost);
        updates.cost = cost;
    }
    if (category) {
        category = normalize(category);
        updates.category = category;
    }
    if (req.file) {
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
        updates.imageUrl = `${basePath}${req.file.filename}`;
    }
    const item = await Item.findByIdAndUpdate(itemId, { $set: updates }, { new: true });
    if (item) {
        return res.status(200).json({ message: "Item updated successfully", item: item });
    } else {
        return res.status(404).json({ message: "Item Not Found" });
    }
};

// DELETE the item given by Id and return the removed item
exports.deleteItem = async (req, res, next) => {
    const itemId = req.params.id;
    if (!isValidId(itemId)) {
        return res.status(400).json({ message: "Invalid Item Id" });
    }
    const item = await Item.findByIdAndDelete(itemId);
    if (item) {
        return res.status(200).json({ message: "Item removed successfully", item: item });
    } else {
        return res.status(404).json({ message: "Item Not Found" });
    }
};

// GET the item given by Id and return the found item
exports.getItem = async (req, res, next) => {
    const itemId = req.params.id;
    if (!isValidId(itemId)) {
        return res.status(400).json({ message: "Invalid Item Id" });
    }
    const item = await Item.findById(itemId);
    if (item) {
        return res.status(200).json({ message: "Item found successfully", item: item });
    } else {
        return res.status(404).json({ message: "Item Not Found" });
    }
};
