const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dish_name: {
        type: String,
        required: [true, 'A Menu Must Have a Name'],
        unique: true,
        maxlength : [30, 'A Menu must have less or equal then 30 characters'],
        minlength : [3 , 'A Menu must have greater or equal than 10 characters'],
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
            values : ['popular-choice' , 'people-favorite' , 'high-selling' , 'others'],
            message : 'vg_category is required to be either `popular-choice`, `people-favorite` or `high-selling` or `others`'
        }
    },
    images: String
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
