const bcrypt = require('bcryptjs');
const { count } = require('../models/user');
const User = require('../models/user');

exports.getLogin = async (req, res, next) => {
  res.status(404).send('To be implemented');
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (error, result) => {
    if (result) {
      return res.status(200).send('Logged In Successfully!');
    } else {
      return res.status(404).send('Email is not registered!');
    }
  });
};

exports.postRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      street,
      city,
      postal_code,
      country,
    } = req.body;
    User.findOne({ email: email }, (error, result) => {
      if (result) {
        return res.status(409).send('Email Already Exists');
      } else {
        bcrypt.hash(password, 8).then((hashedPassword) => {
          let user = new User({
            name: name,
            email: email,
            password: password,
            address: {
              street: street,
              city: city,
              postal_code: postal_code,
              country: country,
            },
          });
          user.save(function (error) {
            if (error) {
              throw error;
            }
          });
          res.status(200).send('Ok');
        });
      }
    });
  } catch (err) {
    throw err;
  }
};
