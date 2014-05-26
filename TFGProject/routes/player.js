/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */
var rnd = require('../utils/random.js');
var player = require('../models/player').player;
var initJson = require('../models/init').init;
var building = require('../models/building').building;
var research = require('../models/research').research;
var mercenary = require('../models/mercenary').mercenary;

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
exports.createByUser = function(name,res){
	var newPlayer = new player();
	newPlayer.name = name;
	if(!res) if(Math.floor(Math.random()*2)==1) newPlayer.guild = "GLD_"+rnd.stringGen(8);
	for(var i in initJson.res){
		r = initJson.res[i];
		var newRes = new building();
		newRes.id = i;
		newRes.name = r.name;
		newRes.scalingValue = r.scalingValue;
		newRes.costs.wood = r.costs.wood;
		newRes.costs.stone = r.costs.stone;
		newRes.costs.iron = r.costs.iron;
		newPlayer.res[i] = newRes;
	}
	for(var i in initJson.buildings){
		b = initJson.buildings[i];
		var newBuilding = new building();
		newBuilding.id = (parseInt(i)+100).toString();
		newBuilding.name = b.name;
		newBuilding.scalingValue = b.scalingValue;
		newBuilding.costs.wood = b.costs.wood;
		newBuilding.costs.stone = b.costs.stone;
		newBuilding.costs.iron = b.costs.iron;
		newPlayer.buildings[i] = newBuilding;
	}
	for(var i in initJson.researches){
		r = initJson.researches[i];
		var newResearch = new research();
		//console.log("i: "+i+", type: "+typeof(i)+"   parseInt(i): "+parseInt(i)+" type: "+typeof(parseInt(i)));
		newResearch.id = (parseInt(i)+200).toString();
		newResearch.name = r.name;
		newResearch.scalingValue = r.scalingValue;
		newResearch.costs.wood = r.costs.wood;
		newResearch.costs.stone = r.costs.stone;
		newResearch.costs.iron = r.costs.iron;
		newPlayer.researches[i] = newResearch;
	}
	for(var i in initJson.mercenaries){
		m = initJson.mercenaries[i];
		var newMercenary = new mercenary();
		//console.log("i: "+i+", type: "+typeof(i)+"   parseInt(i): "+parseInt(i)+" type: "+typeof(parseInt(i)));
		newMercenary.id = (parseInt(i)+300).toString();
		newMercenary.name = m.name;
		newMercenary.costs.wood = m.costs.wood;
		newMercenary.costs.stone = m.costs.stone;
		newMercenary.costs.iron = m.costs.iron;
		newMercenary.stats.hp = m.stats.hp;
		newMercenary.stats.shield = m.stats.shield;
		newMercenary.stats.attack = m.stats.attack;
		newMercenary.stats.speed = m.stats.speed;
		newMercenary.barracksLevel = m.barracksLevel;
		newPlayer.mercenaries[i] = newMercenary;
	}
	newPlayer.save(function(err){
		if(err) console.log(err);
		if(res){
			if(!err) res.json(201, {message: "player created with name: " + newPlayer.name});
			else res.json(500, {message: "could not create player, error: " + err});
		}
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
