var player = require('./player');
var playerDB = require('../models/player').player;

exports.index = function (req, res) {
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			var render = res.render('./game/home', {username:req.session.name, resources:resources});
		}
	});
}

exports.buildings = function(req,res){
	playerDB.findOne({name:req.session.name}, function(err, doc){
		if(!err && doc){
			resources = doc.resources;
			buildings = doc.buildings;
			console.log(buildings[0].woodCost);
			resources['wood'] = Math.floor(resources['wood']);
			resources['stone'] = Math.floor(resources['stone']);
			resources['iron'] = Math.floor(resources['iron']);
			resources['cereal'] = Math.floor(resources['cereal']);
			var render = res.render('./game/buildings', {username:req.session.name, resources:resources, buildings:buildings});
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
			var render = res.render('./game/research', {username:req.session.name, resources:resources});
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
			var render = res.render('./game/mercenaries', {username:req.session.name, resources:resources});
		}
	});
}