var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RatingSchema = new Schema({
    title: {type: String, required: true, unique: false},
    rating: {type: Number, required: true, unique: false},
    comment: {type: String, required: false, unique: false},
    latitude: {type: Number, required: true, unique: true},
    longitude: {type: Number, required: true, unique: true}
});

module.exports = mongoose.model('Rating', RatingSchema);