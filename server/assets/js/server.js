//var url = require("url");
var http = require("http");
//var sails = require('sails');
var db = require('./DB/mainDB');

//var WebSocketServer = require('ws').Server;
//var wss = new WebSocketServer({port: 8888});
var fs = require('fs');
var index = fs.readFileSync('assets/web/index.html');
var format = require('util').format;



function init() {
	db.init();
	console.log('db.init');

	http.createServer(function(request, response) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(index);
		response.end();
	}).listen(8888);
}

exports.init = init;