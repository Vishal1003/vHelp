const bcrypt = require("bcryptjs");
const { count } = require("../models/user");
const User = require("../models/user");

exports.getLogin = async (req, res, next) => {
  res.status(404).send("To be implemented");
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (error, result) => {
    if (result) {
      return res.status(200).send("Logged In Successfully!");
    } else {
      return res.status(404).send("Email is not registered!");
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

    let checkUser = await User.findOne({ email: email });

    if (checkUser) return res.status(400).send("User Already Exists");

    const hashedPassword = await bcrypt.hash(password, 8);

    let user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      address: {
        street: street,
        city: city,
        postal_code: postal_code,
        country: country,
      },
    });

    user = await user.save();

    if (!user) return res.status(400).send("Error creating that user!");

    res.status(200).send(user);
  } catch (err) {
    throw err;
  }
};
