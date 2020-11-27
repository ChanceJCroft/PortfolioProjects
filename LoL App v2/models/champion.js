//while champions shouldn't be added frequently, this is the schema they will follow

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
    name: String,
    image: String,
    numWins: Number,
    numLosses: Number,
    notes: String
});

module.exports = mongoose.model('Champion', ChampionSchema);