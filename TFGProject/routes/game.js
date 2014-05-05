var player = require('./player');
var playerDB = require('../models/player').player;
var upgrades = require('../db/upgrades');

exports.index = function (req, res) {
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			res.render('./game/home', {username:req.session.name, resources:resources, score:doc.score, doc:doc});
		}
	});
}

exports.resources = function (req, res) {
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			resourceBuildings = doc.res;
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			res.render('./game/resources', {username:req.session.name, resources:resources, resourceBuildings:resourceBuildings});
		}
	});
}

exports.buildings = function(req,res){
	console.log("routing to buildings");
	console.log(req.session.name);
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			buildings = doc.buildings;
			console.log(buildings[0].woodCost);
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			console.log(resources);
			res.render('./game/buildings', {username:req.session.name, resources:resources, buildings:buildings});
		}
	});
}

exports.research = function(req,res){
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			res.render('./game/research', {username:req.session.name, resources:resources});
		}
	});
}

exports.mercenaries = function(req,res){
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			res.render('./game/mercenaries', {username:req.session.name, resources:resources});
		}
	});
}

exports.logout = function(req,res){
	req.session.destroy();
	res.redirect('/');
}

exports.upgrade = function(req,res){
	var type = Math.floor(parseInt(req.body.id)/100);
	if(type==0)upgrades.upgradeResBuilding(req,res);
	else if(type==1)upgrades.upgradeBuilding(req,res);
	else if(type==2)return;
}