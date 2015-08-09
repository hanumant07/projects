/*
 * Node JS based server
 */

//set up HTTP server to accept command
var http = require("http");
var ai_eng = require('./ai_eng');
var querystring = require('querystring');
var util = require('util');


var process_command = function(res, command) {
	var ai_inst = new ai_eng(command);
	ai_inst.process_cmd(function (err) {
		if (err) {
			console.log('Error while processing cmd ' + command);
			delete ai_inst;
			res.end();
		} else {
			console.log('command handled successfully');
			delete ai_inst;
			res.end();
		}
	});
}

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
			process_command(res, command);
			console.log('new string ' + command);
		});
	}
});

server.listen(1337);
console.log("Server is listening");
