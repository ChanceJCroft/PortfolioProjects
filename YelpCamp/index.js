//declare all requirements as variables at the top
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

//connection to MongoDB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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


//routing assistance through other files
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)
app.use(express.static(path.join(__dirname, 'public')));

//basic landing page
app.get('/', (req, res) => {
    res.render('home')
});


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