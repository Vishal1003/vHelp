const Item = require("../models/item");
const Vendor = require("../models/vendor");
const Category = require("../models/category");

function isValidId(id) {
    return require("mongoose").Types.ObjectId.isValid(id);
}

exports.getAllProducts = async (req, res, next) => {
    let query = {};
    let category_id = req.query.category_id;
    let category_name = req.query.category;
    let min_cost = req.query.min_cost;
    let max_cost = req.query.max_cost;
    if (category_id) {
        if (!isValidId(category_id)) {
            return res.status(400).json({ success: false, message: "Invalid Category Id" });
        }
        query.category = category_id;
    } else if (category_name) {
        const __category__ = await Category.find({ name: category_name });
        if (__category__) {
            query.category = __category__._id;
        }
    }
    if (min_cost && max_cost) {
        query.cost = { $gte: min_cost, $lte: max_cost };
    } else if (min_cost) {
        query.cost = { $gte: min_cost };
    } else if (max_cost) {
        query.cost = { $lte: max_cost };
    }
    const items = await Item.find(query).populate("category").populate("seller", "-password");
    if (!items) return res.status(404).json({ success: false, message: "No Items found!" });
    return res.status(200).json({ success: true, message: "Products found successfully", items });
};

exports.getOneProduct = async (req, res, next) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Item Id" });
    }
    const item = await Item.findById(req.params.id);
    if (!item)
        return res.status(400).json({ success: false, message: "No product found with that id" });
    res.status(200).json({ success: true, message: "Product found successfully", item });
};

exports.getAllVendors = async (req, res, next) => {
    const vendors = await Vendor.find().select("-password");
    if (!vendors) return res.status(404).json({ success: false, message: "No vendor found" });
    res.status(200).json({ success: true, message: "Vendors found successfully", vendors });
};

exports.getOneVendor = async (req, res, next) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Vendor Id" });
    }
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor)
        return res.status(404).json({ success: false, message: "No vendor found with that Id" });
    const items = await Item.find({ seller: vendor._id });
    res.status(200).json({ success: true, message: "Vendor found successfully", vendor, items });
};

exports.postCategory = async (req, res, next) => {
    let { name } = req.body;
    let category = new Category({ name: name });
    category = await category.save();
    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Error creating that category"
        });
    }

    res.status(200).json({
        success: true,
        message: "Category added successfully",
        category: category
    });
};

exports.getCategory = async (req, res, next) => {
    const categories = await Category.find();
    if (!categories) {
        return res.status(404).json({ success: false, message: "No categories found" });
    }
    res.status(200).json({
        success: true,
        message: "Categories found successfully",
        categories: categories
    });
};
