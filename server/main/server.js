//var url = require("url");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8888});
var fs = require('fs');
var index = fs.readFileSync('../web/index.html');

var format = require('util').format;

var mysql = require('mysql');

var client = mysql.createConnection({
  user: 'root',
  password: '',
  host: '127.0.0.1',
  port: '3306',
});

function iniciar(route, handle) {
	client.query('USE testing');
	client.query("INSERT INTO Usuario VALUES (1, 'user1', 'pass1', 'username1', 1)");
	wss.on('connection', function(ws) {
		ws.on('message', function(message) {
			console.log('received: %s', message);
		});
		ws.send('enviando web');
		ws.send(index);
		//ws.terminate();
	});
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;