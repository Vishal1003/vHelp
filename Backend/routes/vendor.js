const express = require('express');
const controller = require('../controllers/vendor');
const router = express.Router();

// Login
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

// Register
router.post('/register', controller.postRegister);

// Modification operations on Items
router.post('/addItem', controller.postAddItem);

// Non modification operations on Items
router.get('/Items', controller.getItems);
module.exports = router;
