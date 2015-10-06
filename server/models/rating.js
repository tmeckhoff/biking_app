var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RatingSchema = new Schema({
    name: {type: String, required: true, unique: false},
    title: {type: String, required: true, unique: false},
    rating: {type: Number, required: true, unique: false},
    comment: {type: String, required: true, unique: false},
    latitude: {type: Number, required: true, unique: false},
    longitude: {type: Number, required: true, unique: false}
});

module.exports = mongoose.model('Rating', RatingSchema);