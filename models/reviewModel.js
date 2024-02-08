const mongoose = require('mongoose'); // Importing the Mongoose library for MongoDB
const slugify = require('slugify');
const validator = require('validator');

const reviewSchema = new mongoose.Schema({
    ratings:{
        type : Number,
        required: [true, 'A review Must Have a value'],
    },
    feedback:{
        type : String ,
        required : [true, 'A feedback is mandatory'] , 
    }
})

// Create a Mongoose model named 'Menu' based on the defined schema 
const Review = mongoose.model('Review', reviewSchema);

module.exports= Review;