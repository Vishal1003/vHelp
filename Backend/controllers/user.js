const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getLogin = async (req, res, next) => {
    res.status(404).json({ success: false, message: "To be implemented" });
};

exports.postLogin = async (req, res, next) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "email or password does not match" });
    }
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id, isVendor: false }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        // res.cookie('jwt', token, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        return res
            .status(200)
            .json({ success: true, message: "Logged in successfully", user, token: token });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "email or password does not match" });
    }
};

exports.postRegister = async (req, res, next) => {
    let { name, email, password, street, city, postal_code, country } = req.body;
    // Check if user exists already
    let user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(404)
            .json({ success: false, message: "User already registered with that email" });
    }

    // Check if image is available
    const file = req.file;
    if (!file) {
        return res.status(400).json({ success: false, message: "No image file found" });
    }
    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 8);
    user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        address: {
            street: street,
            city: city,
            postal_code: postal_code,
            country: country
        }
    });
    user.image.data = fs.readFileSync(file.path);
    user.image.contentType = file.mimetype;
    user = await user.save();

    if (!user) {
        return res.status(400).json({ success: false, message: "User cannot be registered" });
    }
    res.status(200).json({ success: true, message: "User registered successfully", user });
};
