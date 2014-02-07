//var url = require("url");
var http = require("http");
var sails = require('sails');

//var WebSocketServer = require('ws').Server;
//var wss = new WebSocketServer({port: 8888});
var fs = require('fs');
var index = fs.readFileSync('assets/web/index.html');

var format = require('util').format;

var Db = require('mongodb').Db,
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	ReplSetServers = require('mongodb').ReplSetServers,
	ObjectID = require('mongodb').ObjectID,
	Binary = require('mongodb').Binary,
	GridStore = require('mongodb').GridStore,
	Grid = require('mongodb').Grid,
	Code = require('mongodb').Code,
	BSON = require('mongodb').pure().BSON,
	assert = require('assert');

var format = require('util').format;
console.log('hola');



function iniciar() {
	
	MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
		if(!err) {
			console.log("We are connected");
		}
		console.log(err);
		var collection = db.collection('test_insert');
		collection.insert({a:2, b:1}, function(err, docs) {
			collection.count(function(err, count) {
				console.log(format("count = %s", count));
			});
		});
		var userCollection = db.collection('users');
		userCollection.insert({username:'usrnm', password:'psswd', gameUser: 'asdf', mail: 'asdf@gmail.com'}, function(err, docs) {});
		db.close();
		
		
	});


	console.log('holaaaa');
	http.createServer(function(request, response) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(index);
		response.end();
	}).listen(8888);
}

exports.iniciar = iniciar;