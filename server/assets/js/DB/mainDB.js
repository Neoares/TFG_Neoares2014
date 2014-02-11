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



var time;

var playerModule = require('../JSON/player');
var testModule = require('./test');

function autoUpdateResources(){
	time=setInterval(function(){
		console.log('updated resources');
		},1000);
}


function init(){
	MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
		if(err) {
			console.log(err);
		}else{
			console.log("We are connected");
			autoUpdateResources();
		}
		var playerCollection = db.collection('players');
		playerCollection.drop();
		testModule.fillPlayers(playerCollection, playerModule.player);
	});
	
}

exports.init = init;