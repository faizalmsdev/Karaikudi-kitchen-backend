const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user creation
router.route('/').post(userController.createUser);

// Route for user login
router.route('/login').post(userController.login);

module.exports = router;
