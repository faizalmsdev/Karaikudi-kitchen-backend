// routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').post(userController.createUser);

// Add more routes as needed for fetching, updating, or deleting users

module.exports = router;