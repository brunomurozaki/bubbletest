var express = require('express');
var app = express();
var yaml = require('js-yaml');
var fs   = require('fs');
var bodyParser = require('body-parser');
var merge = require('merge');
var pg = require('pg');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var pages = {};
var friends_data = {};
var port = process.env.PORT || 8080;
var host = process.env.HOST || '0.0.0.0';
var allFbIds = [];

app.use(express.static(__dirname + '/public'));

require('./server/routes')(app);


app.get('/', function (req, res) {
	console.log("Sending HTML");
    res.sendFile(__dirname + '/index.html');
});

app.get('/pages_data', function (req, res){
	//readImportantPages();
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(pages));
});

app.listen(port, host, function() {
    console.log('Our app is running on http://' + host + ':' + port);
	console.log("is it really running?");
	console.log("really really really running?");
});



//readImportantPages();
