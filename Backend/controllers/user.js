const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function normalize(str) {
    return str.trim().toLowerCase();
}

exports.getLogin = async (req, res, next) => {
    res.status(404).send("To be implemented");
};

exports.postLogin = async (req, res, next) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email: normalize(email) });
    if (!user) {
        return res.status(401).send("That email is not registered!");
    }
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id, isVendor: false }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        // res.cookie('jwt', token, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        return res.status(200).json({ message: "Logged in successfully!", token: token });
    } else {
        return res.status(401).send("Password does not match!");
    }
};

exports.postRegister = async (req, res, next) => {
    let { name, email, password, street, city, postal_code, country } = req.body;

    let checkUser = await User.findOne({ email: normalize(email) });

    if (checkUser) return res.status(400).send("User Already Exists");

    const hashedPassword = await bcrypt.hash(password, 8);

    let user = new User({
        name: normalize(name),
        email: normalize(email),
        password: hashedPassword,
        address: {
            street: normalize(street),
            city: normalize(city),
            postal_code: normalize(postal_code),
            country: normalize(country)
        }
    });

    user = await user.save();

    if (!user) return res.status(400).send("Error creating that user!");

    res.status(200).send(user);
};
