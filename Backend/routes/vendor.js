const express = require("express");
const controller = require("../controllers/vendor");
const router = express.Router();

// Login
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

// Register
router.post("/register", controller.postRegister);

// Modification operations on Items
router.post("/item", controller.postAddItem);
router.put("/item/:id", controller.putItem);
router.delete("/item/:id", controller.deleteItem);

// Non modification operations on Items
router.get("/items", controller.getItems);
router.get("/item/:id", controller.getItem);
module.exports = router;
