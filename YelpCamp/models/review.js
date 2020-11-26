const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    //review text
    body: String,
    rating: Number
})

module.exports = mongoose.model("Review", reviewSchema);