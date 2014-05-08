var mongoose = require('mongoose');
var player = require('../models/player').player;
var gameRouter = require('../routes/game');

/**
 * 
 * @param id 	the id of the entity
 * @param lvl	the level of the next upgrade for the entity with id 'id'
 * @returns		the cereal cost of the next upgrade
 */
function calcCerealCost(id,lvl){
	if(id=='0' || id=='1') return Math.floor(10*lvl*Math.pow(1.1,lvl));
	else if(id=='2') return Math.floor(20*lvl*Math.pow(1.1,lvl));
	else return 0;
}

/**
 * 
 * @param id			the id of the entity
 * @param lvl			the level of the next upgrade for the entity with id 'id'
 * @param scalingValue	the scaling value of the costs
 * @param costs			the actual cost of the entity
 * @returns				the costs of the next upgrade
 */
function calcCosts(id,lvl,scalingValue,costs){
	if(id=='0') return {wood: Math.floor(60*Math.pow(scalingValue,lvl-1)), stone: Math.floor(15*Math.pow(scalingValue,lvl-1)), iron: 0};
	else if(id=='1') return {wood: Math.floor(48*Math.pow(scalingValue,lvl-1)), stone: Math.floor(24*Math.pow(scalingValue,lvl-1)), iron: 0};
	else if(id=='2') return {wood: Math.floor(225*Math.pow(scalingValue,lvl-1)), stone: Math.floor(75*Math.pow(scalingValue,lvl-1)), iron: 0};
	else if(id=='3') return {wood: Math.floor(75*Math.pow(scalingValue,lvl-1)), stone: Math.floor(30*Math.pow(scalingValue,lvl-1)), iron: 0};
	else return {wood: costs.wood*scalingValue, stone: costs.stone*scalingValue, iron: costs.iron*scalingValue};
}

/**
 * 
 * @param resource		the name of the resource that is being upgraded
 * @param lvl			the level of the resource producer
 * @returns {Number}	the new amount of production
 */
function calcProduction(resource,lvl){
	if(resource=='wood') return (Math.floor(40+(30*lvl*Math.pow(1.1,lvl))));
	else if(resource=='stone') return (Math.floor(20+(20*lvl*Math.pow(1.1,lvl))));
	else if(resource=='iron') return (Math.floor(10*lvl*Math.pow(1.1,lvl)));
	else if(resource=='cereal') return (Math.floor(20*lvl*Math.pow(1.1,lvl)));
}

/**
 * 
 * @param res			resources that player has
 * @param cost			resources that building costs
 * @returns {Boolean}	true if player can upgrade.
 */
function verifyResources(ava, cost, doc){
	if(ava.wood>=cost.wood && ava.stone>=cost.stone && ava.iron>=cost.iron){
		ava.wood-=cost.wood;
		ava.stone-=cost.stone;
		ava.iron-=cost.iron;
		doc.score += cost.wood + cost.stone + cost.iron;
		return true;
	}
	else return false;
}


exports.upgradeResBuilding = function(req,res){
	var id = req.body.id;
	player.findOne({name:req.session.name}, function(err, doc){
		if(doc.length!=0){
			var element = null;
			id = parseInt(id);
			listPos = id%100;
			element = doc.res[listPos];
			if(verifyResources(doc.resources, element.costs, doc)){
				element.level += 1;
				element.costs = calcCosts(id,element.level+1,element.scalingValue,element.costs);
				if(id==0) doc.resourcesPerHour.woodPerHour = calcProduction('wood',element.level);
				else if(id==1) doc.resourcesPerHour.stonePerHour = calcProduction('stone',element.level);
				else if(id==2) doc.resourcesPerHour.ironPerHour = calcProduction('iron',element.level);
				if(id==3){
					var c = calcProduction('cereal',element.level);
					doc.cerealAvailable += c - doc.resources.cereal;
					doc.resources.cereal = c;
				}
				else doc.cerealAvailable -= (calcCerealCost(id,element.level) - calcCerealCost(id,element.level-1));
				doc.buildings[listPos] = element;
				doc.markModified('res');
				console.log(doc.resourcesPerHour);
				doc.save(function(err){
					if(err) console.log(err);
					else res.redirect("");
				});
			}
		}
	});
}

/*
 * 
 */
exports.upgradeBuilding = function(req,res){
	var id = req.body.id;
	player.findOne({name:req.session.name}, function(err, doc){
		if(doc.length!=0){
			var element = null;
			id = parseInt(id);
			listPos = id%100;
			element = doc.buildings[listPos];
			if(verifyResources(doc.resources, element.costs, doc)){
				element.level += 1;
				element.costs = calcCosts(id,element.level+1,element.scalingValue,element.costs);
				doc.buildings[listPos] = element;
				doc.markModified('buildings');
				doc.save(function(err){
					if(err) console.log(err);
					else res.redirect("");
				});
			}
		}
	});
}

/*
 * 
 *
exports.upgrade = function(req,res){
	var id = req.body.id;
	player.findOne({name:req.session.name}, function(err, doc){
		if(doc.length!=0){
			var element = null;
			id = parseInt(id);
			var type = Math.floor(id/100);
			if(type==0)
				element = doc.resources[id%100];
			else if(type==1)
				element = doc.buildings[id%100];
			else if(type==2)
				element = doc.researches[id%100];
			if(verifyResources(doc.resources, element.costs)){
				element.level += 1;
				doc.resources.wood -= element.costs.wood;
				doc.resources.stone -= element.costs.stone;
				doc.resources.iron -= element.costs.iron;
				element.costs.wood *= element.scalingValue;
				element.costs.stone *= element.scalingValue;
				element.costs.iron *= element.scalingValue;
				var mod;
				if(type==1){
					doc.buildings[id%100] = element;
					mod = 'buildings';
				}
				else if(type==2){
					doc.researches[id%100] = element;
					mod = 'researches';
				}
				else if(type==0){
					mod = 'res';
					//do cereal stuff
					//recalculate production
				}
				doc.markModified(mod);
				doc.save(function(err){
					if(err) console.log(err);
					else res.redirect("/game/buildings");
				});
			}
		}
	});
}
*/