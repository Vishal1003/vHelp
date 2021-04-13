const Item = require("../models/item");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-");
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

exports.getLogin = async (req, res, next) => {
    res.status(404).send("To be implemented");
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email: email });
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
        const { name, email, password } = req.body;
        let vendor = await Vendor.findOne({ email: email });
        if (vendor) return res.status(404).send("Vendor already registered with that emailId");

        const hashedPassword = await bcrypt.hash(password, 8);
        vendor = new Vendor({
            name: name,
            email: email,
            password: hashedPassword
        });

        vendor = await vendor.save();
        if (!vendor) return res.status(400).send("Vendor cannot be registered!");
        res.status(200).send("Registered Successfully");
    } catch (err) {
        throw err;
    }
};

// POST a item
exports.postAddItem = async (req, res, next) => {
    const { name, cost, category, file, email } = req.body;

    const vendor = await Vendor.findOne({ email: email });

    if (!vendor) return res.status(404).send("No vendor found with that email id!");

    let imagePath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }

    const updatedProduct = await Item.findByIdAndUpdate(req.params.id, {
        name: name,
        cost: parseFloat(cost),
        category: category,
        imageUrl: imagePath,
        seller: vendor._id
    });

    if (!updatedProduct) return res.status(400).send("Error updating that item");

    res.status(200).send("Item updated Successfully");
};

// UPDATE item
exports.updateItem = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res
            .status(400)
            .json({ success: false, message: "No product found with that emailId" });
    const { name, cost, category, file, email } = req.body;

    const vendor = await Vendor.findOne({ email: email });

    if (!vendor) return res.status(404).send("No vendor found with that email id!");
    if (!file) return res.status(400).json({ success: false, message: "No image file found" });

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let item = new Item({
        name: name,
        cost: parseFloat(cost),
        category: category,
        imageUrl: `${basePath}${fileName}`,
        seller: vendor._id
    });

    item = await item.save();

    if (!item) return res.status(400).send("Error creating that item");

    res.status(200).send("Item Added Successfully");
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
