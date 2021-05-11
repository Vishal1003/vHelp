const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// PUT the updated user and return updated user
exports.putUser = async (req, res, next) => {
    let { name, email, contact, street, city, postal_code, country } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.json({ success: false, message: "Invalid user" });

    let updates = {};
    updates.address = {};
    if (name) {
        updates.name = name;
    }
    if (email) {
        updates.email = email;
    }
    if (contact) {
        updates.contact = contact;
    }
    if (street) {
        updates.address.street = street;
    }
    if (city) {
        updates.address.city = city;
    }
    if (postal_code) {
        updates.address.postal_code = postal_code;
    }
    if (country) {
        updates.address.country = country;
    }

    if (req.file) {
        if (user.cloudinary_id != undefined) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        updates.imageUrl = result.secure_url;
        updates.cloudinary_id = result.public_id;
    }
    let updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: updates },
        { new: true }
    );
    if (updatedUser) {
        return res.json({
            success: true,
            message: "User details updated successfully",
            user: updatedUser
        });
    } else {
        return res.json({ success: false, message: "User details could not be updated" });
    }
};