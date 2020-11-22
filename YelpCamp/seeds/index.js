const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/campgrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
})


const sample = (array) => {
    array[Math.floor(Math.random() * array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies vitae urna sit amet aliquet. Cras ut diam justo. Cras tristique blandit leo, accumsan maximus magna aliquet vel. Praesent euismod, libero sed blandit tempor, tortor arcu lobortis turpis, ac bibendum lectus nisl ac nisl. Curabitur rutrum nisi nec neque vehicula, a volutpat quam maximus. Suspendisse a massa vitae orci blandit accumsan. Curabitur metus tortor, sodales at interdum quis, laoreet a leo. Donec mollis volutpat arcu nec malesuada. Donec eu nisi eleifend, volutpat enim in, feugiat neque. Sed dapibus ligula sapien, et lacinia erat lobortis et. Donec et leo in elit tincidunt accumsan in sit amet urna. Nulla in sodales nisi. Curabitur dolor sapien, interdum fermentum pharetra sit amet, suscipit quis mi. Proin consequat lacinia lectus, nec tristique magna mattis nec. Quisque mollis purus elit, eget posuere risus commodo sed.",
            price 
        })
        await camp.save();
        }
}

seedDB().then(() => {
    mongoose.connection.close;
});