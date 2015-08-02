/*
 * Node JS based server
 */



//set up HTTP server to accept command
var http = require("http");
//var witd = require('./witd_test');
var querystring = require('querystring');
var util = require('util');


//alarm module
//var alarm = require('alarm');
//alarm = new alarm();

var server = http.createServer(function(req, res) { 
	var body = "";
	console.log('processing request');
	if (req.method == "GET") {
		req.on('data', function(chunk) {
		});
		req.on('end', function() {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end();
		});
	}
	if (req.method == "POST") {
		req.on('data', function (chunk) {
			body += chunk.toString();
		});
		req.on('end', function () {
			console.log('POSTed: ' + body);
			res.writeHead(200, {"Content-Type": "text/html"});
			var command = JSON.stringify(body);
			console.log('new string ' + command);
/*			if (body.Command) {
				console.log("command received");
				var parameter = body.Command;
			if(parameter) {
				alarm.process_command(parameter);
			}
		}
*/
			res.end();
		});
	}
});

server.listen(1337);
console.log("Server is listening");
