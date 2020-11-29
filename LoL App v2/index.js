//declare all requirements as variables at the top
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Champion = require('./models/champion');
const methodOverride = require('method-override');

//connection to MongoDB
mongoose.connect('mongodb://localhost:27017/lol-tracker', {
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


app.engine('ejs', ejsMate);
//set to default to EJS and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//requirements for express and method-overried
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//all champions page
app.get('/champions', async (req, res) => {
    const champion = await Champion.find({});
    res.render('champions/index', { champion })
})

//sends to champions page by default
app.get('/', (req, res) => {
    res.redirect('/champions')
})

//specific champion page
app.get('/champions/:id', async (req, res) => {
    const champion = await Champion.findById(req.params.id);
    res.render('champions/show', { champion });
})



//specific champion edit page
app.get('/champions/:id/edit', async (req, res) => {
    const champion = await Champion.findById(req.params.id);
    res.render('champions/edit', { champion });
})

//finds the champion by the ID and adds the campground information from the req.body
app.put('/champions/:id', async (req, res) => {
    const { id } = req.params;
    const champion = await Champion.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/champions/${champion._id}`)
})



//create a new champion (admin only - to be added later)
app.get('/champions/new', (req, res) => {
    res.render('champions/new');
})



//delete a champion (admin only)
app.delete('/champions/:id', async (req, res) => {
    const { id } = req.params;
    await Champion.findByIdAndDelete(id);
    res.redirect('/champions');
})


app.listen(3000, () => {
    console.log('Serving on Port 3000!')
})

