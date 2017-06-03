var express = require('express');
var app = express();
var yaml = require('js-yaml');
var fs   = require('fs');
var bodyParser = require('body-parser');
var merge = require('merge');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var pages = {};

var friends_data = {};

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.get('/friends_likes_data', function (req, res) {
	var id = req.query.id;
	var data = req.query.data;
	
	if(!friends_data[id].likes)
		friends_data[id].likes = data;
	else 
		friends_data[id].likes = merge(friends_data[id].likes, data);

	//console.log(friends_data);
	res.sendStatus(200);
});

app.get('/friends_data', function (req, res) {
	console.log(req.query.friends_data);
	if(req.query.friends_data == undefined){
		res.sendStatus(400);
	} else {
		friends_data = req.query.friends_data;
		res.sendStatus(200);	
	}

});

app.get('/pages_data', function (req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringfy(pages));
	res.sendStatus(200);
});

app.get('/match_likes', function (req, res) {

});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

function readImportantPages(){
// Get document, or throw exception on error
	try {
	  pages = yaml.safeLoad(fs.readFileSync('/app/public/js/feeds.yaml', 'utf8'));
	} catch (e) {
	  console.log(e);
	}	
}

function printObjectData(object){
	console.log(object);
}

readImportantPages();