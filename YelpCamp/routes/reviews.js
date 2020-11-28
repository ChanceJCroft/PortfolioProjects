const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas');
const Campground = require('../models/campground');
const Review = require('../models/review'); 


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        //status code is in an array, so it needs to be mapped through
        const message = error.details.map(el => el.details).join(',');
        throw new ExpressError(message, 400)
        } else {
            next();
        }
    
}


//POST a new review to a specific campground
router.post('/', validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    //we used the keyword "REVIEW" in the name parameter in this file. So you are looking for the "review" section of the req.body
    const review = new Review(req.body.review);
    //push into the array that exists in the campgroundSchema
    campground.reviews.push(review);
    //save both! The review and the campground both need saving
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))


router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId }});
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/campgrounds/${id}`)
}))


module.exports = router;
