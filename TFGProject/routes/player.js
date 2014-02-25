/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */

var player = require('../models/player').player;

exports.index = function(req, res) {
	player.find({}, function(err, docs){
		if(!err) {
			res.json(200, { workouts: docs });
		} else {
			res.json(500, { message: err });
		}
	});
}

var building = require('../models/building').building;
var research = require('../models/research').research;
var buildingNames = ['edificio1','edificio2','etc'];	//names of the buildings
var researchNames = ['research1', 'research2', 'etc'];	//names of the researches

/*
 * Returns an array of building models.
 * Used to fill the player buildings for the first time.
 */
function initBuildings(){
	var buildsArray = [];
	for(var i in buildingNames){
		var newBuilding = new building();
		newBuilding.name = buildingNames[i];
		newBuilding.woodCost = 10000;
		buildsArray.push(newBuilding);
	}
	return buildsArray;
};

/*
 * Returns an array of research models.
 * Used to fill the player researches for the first time.
 */
function initResearchs(){
	var researchArray = [];
	for (var i in researchNames){
		var newResearch = new research();
		newResearch.name = researchNames[i];
		newResearch.woodCost = 20000;
		researchArray.push(newResearch);
	}
	return researchArray;
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
			newPlayer.buildings = initBuildings();
			newPlayer.researches = initResearchs();
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
	newPlayer.buildings = initBuildings();
	newPlayer.researches = initResearchs();
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
