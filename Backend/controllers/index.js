const Item = require("../models/item");
const Vendor = require("../models/vendor");

exports.getAllProducts = async (req, res, next) => {
    const items = await Item.find();
    if (!items) return res.status(404).json({ success: false, message: "No Items found!" });
    res.status(200).send(items);
};

exports.getOneProduct = async (req, res, next) => {
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
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor)
        return res.status(404).json({ success: false, message: "No vendor found with that Id" });
    const items = await Item.find({ seller: vendor._id });
    res.status(200).json({ vendor, items });
};
