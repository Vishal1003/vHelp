const Item = require("../models/item");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendor");

exports.getLogin = async (req, res, next) => {
  res.status(404).send("To be implemented");
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  Vendor.findOne({ email: email }, (error, result) => {
    if (error) {
      throw error;
    }
    if (result) {
      return res.status(200).send("Logged In Successfully!");
    } else {
      return res.status(404).send("Email is not registered!");
    }
  });
};

exports.postRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let vendor = await Vendor.findOne({ email: email });
    if (vendor)
      return res
        .status(404)
        .send("Vendor already registered with that emailId");

    const hashedPassword = await bcrypt.hash(password, 8);
    vendor = new Vendor({
      name: name,
      email: email,
      password: hashedPassword,
    });

    vendor = await vendor.save();
    if (!vendor) return res.status(400).send("Vendor cannot be registered!");
    res.status(200).send("Registered Successfully");
  } catch (err) {
    throw err;
  }
};

// adding Items
exports.postAddItem = async (req, res, next) => {
  const { name, cost, category, imageUrl, email } = req.body;

  const vendor = await Vendor.findOne({ email: email });

  if (!vendor)
    return res.status(404).send("No vendor found with that email id!");

  let item = new Item({
    name: name,
    cost: parseFloat(cost),
    category: category,
    imageUrl: imageUrl,
    seller: vendor._id,
  });

  item = await item.save();

  if (!item) res.status(400).send("Error creating that item");

  res.status(200).send("Item Added Successfully");
};
