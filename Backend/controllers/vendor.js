const Item = require('../models/item');
const bcrypt = require('bcryptjs');
const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');

exports.getLogin = async (req, res, next) => {
  res.status(404).send('To be implemented');
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email: email });
  if (!vendor) {
    return res.status(401).send('Email or Password does not match!');
  }
  if (bcrypt.compareSync(password, vendor.password)) {
    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    return res.status(200).json({
      token: token,
      message: 'Logged in successfully!',
    });
  } else {
    return res.status(401).send('Email or Password does not match!');
  }
};

exports.postRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let vendor = await Vendor.findOne({ email: email });
    if (vendor)
      return res
        .status(404)
        .send('Vendor already registered with that emailId');

    const hashedPassword = await bcrypt.hash(password, 8);
    vendor = new Vendor({
      name: name,
      email: email,
      password: hashedPassword,
    });

    vendor = await vendor.save();
    if (!vendor) return res.status(400).send('Vendor cannot be registered!');
    res.status(200).send('Registered Successfully');
  } catch (err) {
    throw err;
  }
};

// adding Items
exports.postAddItem = async (req, res, next) => {
  const { name, cost, category, imageUrl, email } = req.body;

  const vendor = await Vendor.findOne({ email: email });

  if (!vendor)
    return res.status(404).send('No vendor found with that email id!');

  let item = new Item({
    name: name,
    cost: parseFloat(cost),
    category: category,
    imageUrl: imageUrl,
    seller: vendor._id,
  });

  item = await item.save();

  if (!item) res.status(400).send('Error creating that item');

  res.status(200).send('Item Added Successfully');
};

exports.getItems = async (req, res, next) => {
  const vendorId = req.user.vendorId;
  const items = await Item.find({ seller: vendorId });
  if (items) {
    return res.status(200).json({ items: items });
  } else {
    return res.status(400).send('Could not retrieve items!');
  }
};
