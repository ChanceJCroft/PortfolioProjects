//declare all requirements as variables at the top
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const { campgroundSchema } = require('./schemas') 

//connection to MongoDB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//testing the MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
//set to default to EJS and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//requirements for express and method-overried
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


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



//basic landing page
app.get('/', (req, res) => {
    res.render('home')
});


app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

//GET the form for creating a new campground in new.ejs
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

//post the form for the new campground, save it, and redirect back to that campground show page
//runs the catchAsync function, which catches any async errors
app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    //throws an error if there is no campground data, will follow down to the error handling at the bottom of the form
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

//show information for specific campground - passing in that campground information to EJS
app.get('/campgrounds/:id', async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
});

//edit a specific campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
})

//finds the campground by the ID and adds the campground information from the req.body
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

//delete a campground
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//Will display the statusCode and message if there is an error
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong.' } = err;
    if(!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})