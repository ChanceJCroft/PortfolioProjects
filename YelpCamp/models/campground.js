const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            //made an arry that looks for Schema objects in the 'Review' page
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//this removes all reviews for a campground whenever campground is deleted
//if there is a document passed in (review), then remove any review that has that ID somewhere within the review
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);