//var url = require("url");
var http = require("http");

//var WebSocketServer = require('ws').Server;
//var wss = new WebSocketServer({port: 8888});
var fs = require('fs');
var index = fs.readFileSync('../web/index.html');

var format = require('util').format;


function iniciar() {
	http.createServer(function(request, response) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(index);
		response.end();
	}).listen(8888);
}

exports.iniciar = iniciar;