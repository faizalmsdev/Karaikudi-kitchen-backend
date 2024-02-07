const mongoose = require('mongoose'); // Importing the Mongoose library for MongoDB
const slugify = require('slugify');
const validator = require('validator');

const menuSchema = new mongoose.Schema({
    dish_name: {
        type: String,
        required: [true, 'A Menu Must Have a Name'],
        unique: true,
        maxlength : [30, 'A Menu must have less or equal then 30 characters'],
        minlength : [10 , 'A Menu must have greater or equal than 10 characters'],
        // validate : [validator.isAlpha , "Menu name must only contain characters"]
    },
    price:{
        type: Number,
        required: [true, 'A Menu Must Have a duration'],
    },
    instock : {
        type: Boolean,
        default: true
    }, 
    discount_price_available : {
        type : Boolean,
        default : false
    },
    discount_price : {
        type : Number,
    },
    description : {
        type : String,
        required : [true, 'A menu must have a description']
    },
    vg_category : {
        type: String,
        required: [true, 'A Menu Must Have a vg_Category'],
        enum:{
            values: ['veg' , 'non-veg' ],
            message : 'vg_category is required to be either `veg` or `non-veg`'
        }
    },
    category : {
        type : String,
        enum:{
            values : ['popular-choice' , 'people-favorite' , 'high-selling'],
            message : 'vg_category is required to be either `popular-choice`, `people-favorite` or `high-selling`'
        }
    },
    images: {
        type: [String] // Array of strings (image URLs)
    }

});

// Create a Mongoose model named 'Menu' based on the defined schema 
const Menu = mongoose.model('Menu', menuSchema);

module.exports= Menu;