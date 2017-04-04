var tst = 0;


//Lets require/import the HTTP module
var http = require('http'),
fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    
    if(request.url.length == 1)
    {
    	fs.readFile('./index.html', function (err, html) {
		    if (err) {
		        throw err; 
		    }
            response.writeHeader(200, {"Content-Type": "text/html"}); 
		    response.write(html);
            response.end();
		});
    }

    
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){

    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", process.env.PORT || PORT);
});