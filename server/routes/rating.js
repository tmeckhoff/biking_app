var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rating = require('../models/rating');


router.get('/', function(req,res,next){
    return Rating.find({}).lean().exec(function(err, ratings){
        if(err) throw new Error(err);
        //res.send(JSON.stringify(ratings));
        res.json(ratings);
    });
});

router.post('/',function(req,res,next){
    var rating = new Rating({name: req.body.name, title: req.body.title, rating: req.body.rating, comment: req.body.comment, longitude: req.body.longitude, latitude: req.body.latitude});
    rating.save(function(err){
        if(err) console.log('error: ', err);
        res.send(rating.toJSON());
    });
});

router.delete('/:_id', function(req, res) {
    Location.remove({
        _id: req.params._id
    }, function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Rating deleted'
        });

    });
});





module.exports = router;