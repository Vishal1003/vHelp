const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getLogin = async (req, res, next) => {
  res.status(404).send('To be implemented');
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send('Email or Password does not match!');
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    return res
      .status(200)
      .json({ message: 'Logged in successfully!', token: token });
  } else {
    return res.status(401).send('Email or Password does not match!');
  }
};

exports.postRegister = async (req, res, next) => {
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

  if (checkUser) return res.status(400).send('User Already Exists');

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

  if (!user) return res.status(400).send('Error creating that user!');

  res.status(200).send(user);
};
