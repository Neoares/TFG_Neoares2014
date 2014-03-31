var mongoose = require('mongoose');
var player = require('../models/player').player;

var time;

/*
 * Updates all resources from all players a quantity of
 * ('resourcePerHour'/3600) each second
 */
function autoUpdateResources(){
	time=setInterval(function(){
		player.find({}, 'resources resourcesPerHour', function(err, doc){
			for(var i in doc){
				doc[i].resources.wood += doc[i].resourcesPerHour.woodPerHour/3600;
				doc[i].resources.stone += doc[i].resourcesPerHour.stonePerHour/3600;
				doc[i].resources.iron += doc[i].resourcesPerHour.ironPerHour/3600;
				doc[i].resources.cereal += doc[i].resourcesPerHour.cerealPerHour/3600;
			}
			doc[i].save();
		});
		console.log('updated resources');
		},1000);
}

function resetDB(){
	mongoose.connection.collections['usermodels'].drop(function(err){ if(err) console.log(err)});
	mongoose.connection.collections['playermodels'].drop(function(err){ if(err) console.log(err)});
}

/*
 * Initializes the DataBase
 * 'connect' parameter format: 'mongodb://ip_address:port/database'.
 */
function init(){
	mongoose.connect('mongodb://localhost:27017/test', function(err){
		if(err) console.log('error attempting to connect to database: ' + err);
		else{
			//resetDB();
			console.log('db init');
			autoUpdateResources();
		}
	});

}

exports.init = init;