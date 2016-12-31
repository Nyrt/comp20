var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  next();
});

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mongo2048';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response, next) {
	//db.collection("scores").remove({});
  response.render('pages/index');
});


app.get('/redline.json', function(request, response, next){
	var options = {
		host:"developer.mbta.com",
		path:'/lib/rthr/red.json',
		};

	var output = "";
	var request = http.get(options, function(res){
		res.on('data', function(chunk){
			output += chunk;
		});

		res.on('end', function(){
			response.send(JSON.parse(output));
		});
	});
	request.end();
});

app.post('/submit.json', function(request, response, next){
	var entry = request.body;
	if(entry.username != null && entry.score != null && entry.grid != null){
		entry.created_at = (new Date).getTime();
		db.collection('scores', function(error, coll) {
			var id = coll.insert(entry, function(error, saved) {
				if (error) {
					console.log("Error: " + error);
					response.send(500);
				}
				else {
					response.send(200);
				}
		    });
		});
	}
	else
		response.send(400);
});

app.get('/scores.json', function(request, response, next){
	response.set('Content-Type', 'application/json');
	var data = "";
	if(request.query.username == null)
		response.send("[]");
	else
		db.collection('scores', function(er, collection) {
			collection.find({"username":request.query.username}).toArray(function(err, cursor) {
				if (!err) {
					data += '[';
					for (var count = 0; count < cursor.length; count++) {
						data += '{"username":"' + cursor[count].username + '","score":' + cursor[count].score + ',"grid":"' + cursor[count].username + '","created_at":' + cursor[count].created_at + '}';
						if(count != cursor.length -1)
							data += ",";
					}
					data += "]"
					response.send(data);
				} else {
					response.send(500);
				}
			});
		});
});

app.get('/allscores.json', function(request, response, next){
	response.set('Content-Type', 'application/json');
	var data = "";
	db.collection('scores', function(er, collection) {
		collection.find().sort({"score":-1}).toArray(function(err, cursor) {
			if (!err) {
				data += '[';
				for (var count = 0; count < cursor.length; count++) {
					data += '{"username":"' + cursor[count].username + '","score":' + cursor[count].score + ',"grid":"' + cursor[count].username + '","created_at":' + cursor[count].created_at + '}';
					if(count != cursor.length -1)
						data += ",";
				}
				data += "]"
				response.send(data);
			} else {
				response.send(500);
			}
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});