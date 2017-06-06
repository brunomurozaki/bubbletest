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

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/pages_data', function (req, res){
	readImportantPages();	
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(pages));
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

readImportantPages();



pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});