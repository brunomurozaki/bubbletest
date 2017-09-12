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

pg.defaults.ssl = false;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');
  createBasicDatabase(client);

});

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

app.get('/del_user', function (req, res){
	var fb_id = req.query.fb_id;
	delFbId(fb_id);
	res.sendStatus(200);
});

app.get('/add_user', function (req, res){
	var fb_id = req.query.fb_id;
	addFbId(fb_id);
	res.sendStatus(200);
});

app.get('/get_users', function (req, res){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		const results = [];
		if (err) throw err;
		var query = "SELECT fb_id from users;";
		client.query(query)
			.on("row", function(row){
				results.push(row.fb_id);
			})
			.on("error", function(error){
				console.log(error);
			})
			.on("end", function(){
				done();
				return res.json(results);
		  	});
	});
});

app.listen(port, host, function() {
    console.log('Our app is running on http://' + host + ':' + port);
	console.log("is it really running?");
	console.log("really really really running?");
});

function readImportantPages(){
// Get document, or throw exception on error
	try {
	  pages = yaml.safeLoad(fs.readFileSync('/app/public/js/feeds.yaml', 'utf8'));
	} catch (e) {
	  console.log(e);
	}
}

readImportantPages();

function createBasicDatabase(client){
	var tableQuery = "create table IF NOT EXISTS users(fb_id CHAR(50) PRIMARY KEY NOT NULL );"
	client.query(tableQuery);
}

function delFbId(fb_id){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	  if (err) throw err;
	  var query = "DELETE FROM users WHERE fb_id = '" + fb_id + "';";
	  client.query(query)
	  	.on("error", function(error){
	  		console.log(error);
	  	})
	  	.on("end", function(){
	  		done();
	  	});
	});
}

function addFbId(fb_id){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	  if (err) throw err;
	  var query = "INSERT INTO users VALUES('" + fb_id + "');";
	  client.query(query)
	  	.on("error", function(error){
	  		console.log(error);
	  	})
	  	.on("end", function(){
	  		done();
	  	});
	});
}
