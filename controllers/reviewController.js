const Review = require('../models/reviewModel');


exports.getAllReviews = async (req,res) => {
    try{

        const review = await Review.find();

        res.status(200).json({
            status : 'Success',
            results: review.length,
            data: {
                review,
            }
        });

    }catch(err){
        res.status(404).json({
            status : 'fail',
            message : err
        })
    }
}

exports.createReview = async(req, res) => {
    try{

        const newReview = await Review.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                review: newReview
            }
        })

    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}