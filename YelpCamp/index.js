//declare all requirements as variables at the top
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

//connection to MongoDB
mongoose.connect('mongodb://localhost:27017/campgrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//testing the MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
})

//set to default to EJS and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//basic landing page
app.get('/', (req, res) => {
    res.render('home')
})

//request to make a new campground
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'First Campground', description: 'The first one you did.'});
    await camp.save();
    res.send(camp)
})



app.listen(3000, () => {
    console.log('Serving on Port 3000!')
})