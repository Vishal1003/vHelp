const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

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

module.exports = router;
