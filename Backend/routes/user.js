const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);
module.exports = router;
