const Item = require('../models/item');
const bcrypt = require('bcryptjs');
const Vendor = require('../models/vendor');

exports.getLogin = async (req, res, next) => {
  res.status(404).send('To be implemented');
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  Vendor.findOne({ email: email }, (error, result) => {
    if (error) {
      throw error;
    }
    if (result) {
      return res.status(200).send('Logged In Successfully!');
    } else {
      return res.status(404).send('Email is not registered!');
    }
  });
};

exports.postRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    Vendor.findOne({ email: email }, (error, result) => {
      if (error) {
        throw error;
      }
      if (result) {
        return res.status(409).send('Email Already Exists');
      } else {
        bcrypt.hash(password, 8).then((hashedPassword) => {
          let vendor = new Vendor();
          vendor.name = name;
          vendor.email = email;
          vendor.password = hashedPassword;
          vendor.save(function (error) {
            if (error) {
              throw error;
            }
          });
          res.status(200).send('Registered Successfully');
        });
      }
    });
  } catch (err) {
    throw err;
  }
};

exports.postAddItem = (req, res, next) => {
  const { name, cost, category, imageUrl, email } = req.body;
  Vendor.findOne({ email: email }, function (error, vendor) {
    if (error) {
      throw error;
    }
    if (vendor) {
      let item = new Item({
        name: name,
        cost: parseFloat(cost),
        category: category,
        imageUrl: imageUrl,
        seller: vendor._id,
      });
      item.save((error) => {
        throw error;
      });
      res.status(200).send('Item Added Successfully');
    } else {
      res.status(404).send('Vendor with that email does not exists!');
    }
  });
};
