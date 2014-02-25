var mongoose = require('mongoose');
var player = require('../models/player').player;

var time;

/*
 * Updates all resources from all players a quantity of
 * ('resourcePerHour'/3600) each second
 */
function autoUpdateResources(){
	time=setInterval(function(){
		player.find({}, function(err, data){
			for(var i in data){
				data[i].wood += data[i].woodPerHour/3600;
				data[i].save();
			}
		});
		console.log('updated resources');
		},1000);
}

/*
 * Initializes the DataBase
 * 'connect' parameter format: 'mongodb://ip_address:port/database'.
 */
function init(){
	mongoose.connect('mongodb://localhost:27017/test', function(err){
		if(err) console.log('error attempting to connect to database: ' + err);
		else{
			mongoose.connection.collections['usermodels'].drop(function(err){ if(err) console.log(err)});
			mongoose.connection.collections['playermodels'].drop(function(err){ if(err) console.log(err)});
			console.log('db init');
			autoUpdateResources();
		}
	});

}

exports.init = init;