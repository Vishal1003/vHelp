const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.putProfile = async (req, res, next) => {
    let { name, email, password, street, city, postal_code, country } = req.body;
    // Check if user exists already
    // let user = await User.findOne({ email: email });
    // if (user) {
    //     return res.json({ success: false, message: "User already registered with that email" });
    // }

    // // Check if image is available
    // const file = req.file;
    // if (!file) {
    //     return res.json({ success: false, message: "No image file found" });
    // }
    // // Hashing Password
    // const hashedPassword = await bcrypt.hash(password, 8);
    // user = new User({
    //     name: name,
    //     email: email,
    //     password: hashedPassword,
    //     address: {
    //         street: street,
    //         city: city,
    //         postal_code: postal_code,
    //         country: country
    //     }
    // });
    // user.image.data = fs.readFileSync(file.path);
    // user.image.contentType = file.mimetype;
    // user = await user.save();

    // if (!user) {
    //     return res.json({ success: false, message: "User cannot be registered" });
    // }
    // res.json({ success: true, message: "User registered successfully", user });
};
