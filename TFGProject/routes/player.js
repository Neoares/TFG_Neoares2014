/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */

var player = require('../models/player').player;
var initJson = require('../models/init').init;

exports.index = function(req, res) {
	player.find({}, function(err, docs){
		if(!err) {
			res.json(200, { workouts: docs });
		} else {
			res.json(500, { message: err });
		}
	});
}

/*
 * Creates a new player using post method (deprecated)
 */
exports.create = function(req, res){
	var player_name = req.body.name;
	
	player.findOne({name: player_name}, function(err, doc){
		if(!err && !doc){
			var newPlayer = new player();
			
			newPlayer.name = player_name;
			newPlayer.save(function(err){
				if(!err) res.json(201, {message: "player created with name: " + newPlayer.name});
				else res.json(500, {message: "could not create player, error: " + err});
			});
		}
		else if(!err) res.json(403, {message: "player with that name already exists, please update instead of create or create a new workout with a different name."});
		else res.json(500, {message: err});
	});
}

/*
 * This method also creates a player.
 * The difference between this and the above method, is that this method
 * is called by the create method in 'user.js' route.
 */
exports.createByUser = function(name){
	var newPlayer = new player();
	newPlayer.name = name;
	newPlayer.buildings = initJson.buildings;
	newPlayer.researches = initJson.researches;
	newPlayer.res = initJson.res;
	newPlayer.save(function(err){
		if(err) console.log(err);
		/*if(!err) res.json(201, {message: "player created with name: " + newPlayer.name});
		else res.json(500, {message: "could not create player, error: " + err});*/
	});
}


exports.show = function(req, res){
	var player_name = req.params.name;
	player.findOne({name: player_name}, function(err, doc){
		if(!err && doc) res.json(200, doc);
		else if(err) res.json(500, { message: "Error loading workout." + err});
		else res.json(404, { message: "player not found."});
	});
}


/*
 * Deletes a player by name.
 */
exports.remove = function(req, res){
	var player_name = req.body.name;
	player.findOne({name: player_name}, function(err, doc){
		if(!err && doc){
			doc.remove();
			res.json(200, { message: "player removed."});
		}
		else if(!err) res.json(404, { message: "Could not find player."});
		else res.json(403, {message: "Could not delete player. " + err});
	});
}
