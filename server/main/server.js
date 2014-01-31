//var url = require("url");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8888});

function iniciar(route, handle) {
	
	wss.on('connection', function(ws) {
		ws.on('message', function(message) {
			console.log('received: %s', message);
		});
		ws.send('something');
	});
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;


