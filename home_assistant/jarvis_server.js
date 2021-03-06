/*
 * Node JS based server
 */



//set up HTTP server to accept command
var http = require("http");
var ai_eng = require('./ai_eng');
var querystring = require('querystring');
var util = require('util');



//alarm module
//var alarm = require('alarm');
//alarm = new alarm();

var process_command = function(res, command) {
	var ai_inst = new ai_eng(command);
	ai_inst.process_cmd(function (err) {
		if (err) {
			console.log('Error while processing cmd ' + command);
			console.log('Error is ' + err);
		} else {
			console.log('command handled successfully')
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
/*			if (body.Command) {
				console.log("command received");
				var parameter = body.Command;
			if(parameter) {
				alarm.process_command(parameter);
			}
		}

			res.end();
*/
		});
	}
});

server.listen(1337);
console.log("Server is listening");
