const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

// POST login user as a vendor or non-vendor
router.post("/login", controller.postLogin);

// POST register user as a vendor or non-vendor
router.post("/register", controller.postRegister);

// GET all products
router.get("/items", controller.getAllProducts);

// GET one product
router.get("/item/:id", controller.getOneProduct);

// GET vendors list
router.get("/vendors", controller.getAllVendors);

// GET one vendor and his products
router.get("/vendor/:id", controller.getOneVendor);

// POST category for the product
router.post("/category", controller.postCategory);

// GET all categories for the products
router.get("/category", controller.getCategory);

// GET all the products of certain category
router.get("/category/:id", controller.filterProductCategory);

// GET all the products of certain vendor
router.get("/seller/:id", controller.filterProductVendor);

// verify JWT
router.post("/verify", controller.verifyJWT);

module.exports = router;
