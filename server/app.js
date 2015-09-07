var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Rating = require('./models/rating');
var index = require('./routes/index');
var rating = require('./routes/rating');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
}));

app.use('/rating', rating);
app.use('/', index);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log("Listening on Port: ", app.get('port'));
});

//Mongo Setup
//var mongoURI = "mongodb://heroku_5sxnx61g:76e4uhcrm9r23gg1usgskolo7n@ds041593.mongolab.com:41593/heroku_5sxnx61g";
var mongoURI = "mongodb://localhost:27017/rate_my_ride";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
    console.log('mongodb connection open');
});



module.exports = app;