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

var buildings = ['aserradero', 'barrizal', 'mina_hierro', 'campo_cereales', 'milicia'];

var time;

var playerModule = require('../JSON/player');
var testModule = require('./test');
var buildingModule = require('../JSON/building');

var player = playerModule.player;
var building = buildingModule.building;

function autoUpdateResources(){
	time=setInterval(function(){
		console.log('updated resources');
		},1000);
}

function newPlayer(name, playerCollection){
	player._id = ObjectID();
	player.name = name;
	for(var i=0; i<buildings.length;i++){
		building._id = ObjectID();
		building.name = buildings[i];
		player.buildings.push(building);
	}
	playerCollection.insert(player, function (err, inserted) {
			if(err) console.log(err);
		});
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
		newPlayer('testPlayer', playerCollection);
		//testModule.fillPlayers(playerCollection, player, ObjectID);
	});
}

exports.init = init;