const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas');


const validateCampground = (req, res, next) => {
    const result = campgroundSchema.validate(req.body);
    if(result.error){
        //status code is in an array, so it needs to be mapped through
        const message = error.details.map(el => el.details).join(',');
        throw new ExpressError(message, 400)
        } else {
            next();
        }
}


router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});




//GET the form for creating a new campground in new.ejs
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

//post the form for the new campground, save it, and redirect back to that campground show page
//runs the catchAsync function, which catches any async errors
router.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    //throws an error if there is no campground data, will follow down to the error handling at the bottom of the form
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

//show information for specific campground - passing in that campground information to EJS
router.get('/:id', async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });
});

//edit a specific campground
router.get('/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
})

//finds the campground by the ID and adds the campground information from the req.body
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

//delete a campground
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})


module.exports = router;