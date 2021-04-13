const Item = require("../models/item");
const Vendor = require("../models/vendor");

function isValidId(id) {
    return require("mongoose").Types.ObjectId.isValid(id);
}

function normalize(str) {
    return str.trim().toLowerCase();
}

exports.getAllProducts = async (req, res, next) => {
    let query = {};
    let category = req.query.category;
    let min_cost = req.query.min_cost;
    let max_cost = req.query.max_cost;
    if (category) {
        category = normalize(category);
        query.category = category;
    }
    if (min_cost && max_cost) {
        min_cost = normalize(min_cost);
        max_cost = normalize(max_cost);
        query.cost = { $gte: min_cost, $lte: max_cost };
    } else if (min_cost) {
        min_cost = normalize(min_cost);
        query.cost = { $gte: min_cost };
    } else if (max_cost) {
        max_cost = normalize(max_cost);
        query.cost = { $lte: max_cost };
    }
    const items = await Item.find(query);
    if (!items) return res.status(404).json({ success: false, message: "No Items found!" });
    res.status(200).send(items);
};

exports.getOneProduct = async (req, res, next) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Invalid Item Id" });
    }
    const item = await Item.findById(req.params.id);
    if (!item)
        return res.status(400).json({ success: false, message: "No product found with that id" });
    res.status(200).send(item);
};

exports.getAllVendors = async (req, res, next) => {
    const vendors = await Vendor.find().select("-password");
    if (!vendors) return res.status(404).json({ success: false, message: "No vendor found" });
    res.status(200).send(vendors);
};

exports.getOneVendor = async (req, res, next) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Invalid Vendor Id" });
    }
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor)
        return res.status(404).json({ success: false, message: "No vendor found with that Id" });
    const items = await Item.find({ seller: vendor._id });
    res.status(200).json({ vendor, items });
};
