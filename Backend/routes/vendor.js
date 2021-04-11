const express = require('express');
const controller = require('../controllers/vendor');
const router = express.Router();

// Login
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

// Register
router.post('/register', controller.postRegister);

// Add an Item
router.post('/addItem', controller.postAddItem);

module.exports = router;
