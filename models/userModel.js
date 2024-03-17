// models/userModel.js
const mongoose = require('mongoose');
const validator = require('validator'); // Import the validator library

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'], // Use validator.isEmail for validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  roles: {
    type: [String],
    enum: ['user', 'admin'],
    default: ['user'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;