var mongoose = require('mongoose');
var player = require('../models/player').player;
var playerRoute = require('../routes/player');
var user = require('../models/user').user;
var rnd = require('../utils/random.js');

var sckt;



var time;
var fs = require('fs');

/*
 * Updates all resources from all players a quantity of
 * ('resourcePerHour'/3600) each second
 */
function autoUpdateResources(){
	setInterval(function(){
		player.find({}, 'resources resourcesPerHour', function(err, docs){
			if(docs.length==0)return;
				for(var i in docs){
					docs[i].resources.wood += docs[i].resourcesPerHour.woodPerHour/3600;
					docs[i].resources.stone += docs[i].resourcesPerHour.stonePerHour/3600;
					docs[i].resources.iron += docs[i].resourcesPerHour.ironPerHour/3600;
					docs[i].save(function(err){
						if(err) console.log(err);
					});
					
				}
		});
		//console.log('resources updated');
	},1000);
}

function updateHour(socket){
	setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);
}

/*var resTimer;
function updateResources(socket){
	resTimer = setInterval(function(){
        console.log("algo");
    }, 1000);
		
		sckt.emit('resources', {
			wood: Math.floor(docs[i].resources.wood),
			stone: Math.floor(docs[i].resources.stone),
			iron: Math.floor(docs[i].resources.iron)
		});
}*/


function createTestUser(){
	var newUser = new user();
	newUser.username = "USR_"+rnd.stringGen(8);
	newUser.usernameLower = newUser.username.toLowerCase();
	newUser.password = rnd.stringGen(8);
	newUser.mail = rnd.stringGen(8)+"@gmail.com";
	newUser.save(function(err){
		if(!err){
			playerRoute.createByUser(newUser.username,null);	//calls the createByUser method in 'player.js' route.
		}
		else res.json(500, {message: "could not create user, error: " + err});
	});
}

/*
 * Deletes the user and player tables in the database.
 */
function resetDB(){
	mongoose.connection.collections['usermodels'].drop(function(err){ if(err) console.log(err)});
	mongoose.connection.collections['playermodels'].drop(function(err){ if(err) console.log(err)});
	mongoose.connection.collections['buildingmodels'].drop(function(err){ if(err) console.log(err)});
	mongoose.connection.collections['researchmodels'].drop(function(err){ if(err) console.log(err)});
	mongoose.connection.collections['mercenarymodels'].drop(function(err){ if(err) console.log(err)});
	console.log("DATABASE RESTARTED");
}

/*
 * Initializes the DataBase.
 * 'connect' parameter format: 'mongodb://ip_address:port/database'.
 */
function init(io){
	mongoose.connect('mongodb://localhost:27017/test', function(err){
		if(err) console.log('error attempting to connect to database: ' + err);
		else{
			/*resetDB();
			for(var i=0;i<100;i++)
				createTestUser();*/
			console.log('db init');
			autoUpdateResources();
		}
		io.sockets.on('connection', function(socket){
			updateHour(socket);
		});
		/*io.sockets.on('connection', function(socket){
			clearInterval(resTimer);
			updateResources(socket);
			console.log("llamada");
		});*/
	});

}

exports.init = init;