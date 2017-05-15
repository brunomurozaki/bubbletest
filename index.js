var express = require('express');
var app = express();
yaml = require('js-yaml');
fs   = require('fs');


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});


function readImportantPages(){
// Get document, or throw exception on error
	try {
	  var doc = yaml.safeLoad(fs.readFileSync('~/public/js/feeds.yml', 'utf8'));
	  console.log(doc);
	} catch (e) {
	  console.log(e);
	}	
}

readImportantPages();