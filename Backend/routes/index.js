const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

// GET all products
router.get("/items", controller.getAllProducts);

// GET one product
router.get("/item/:id", controller.getOneProduct);

// GET vendors list
router.get("/vendor", controller.getAllVendors);

// GET one vendor and his products
router.get("/vendor/:id", controller.getOneVendor);

module.exports = router;
