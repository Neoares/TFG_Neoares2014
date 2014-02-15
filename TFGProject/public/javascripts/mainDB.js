var mongoose = require('mongoose');
var playerModel = require('../../models/player').player;

var time;

function autoUpdateResources(){
	time=setInterval(function(){
		console.log('updated resources');
		},1000);
}

function init(){
	mongoose.connect('mongodb://localhost:27017/test');
	//autoUpdateResources();
	//mongoose.connection.collections['playermodels'].drop(function(err){ if(err) console.log(err)});
	console.log('db init');
}

exports.init = init;