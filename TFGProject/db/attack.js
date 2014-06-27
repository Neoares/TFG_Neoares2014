var mongoose = require('mongoose');
var player = require('../models/player').player;
var gameRouter = require('../routes/game');


/**
 * 
 * @param userMercs		object with user mercenaries
 * @param targetMercs	object with target mercenaries
 * @returns {Number}	the result of the fight [0:draw, -1:target won, 1:user won]
 */
function doFight(userMercs, targetMercs){
	var counter = 0;
	for(var i=0; i<userMercs.length; i++){
		counter += parseInt(userMercs[i].quantity);
	}
	for(var i=0; i<targetMercs.length; i++){
		counter -= parseInt(targetMercs[i].quantity);
	}
	if(counter>0) 		return 1;	//user won
	else if(counter<0) 	return -1;	//target won
	else 				return 0;	//draw
}

function destroyMercenaries(m){
	for(var i=0; i<m.length; i++){
		m[i].quantity=0;
	}
	return m;
}

exports.attack = function(req,res){
	var targetName = req.body.target;
	player.findOne({name:targetName}, function(err,targetDoc){
		player.findOne({name:req.session.name}, function(err,userDoc){
			var result = doFight(userDoc.mercenaries, targetDoc.mercenaries);
			if(result==1){
				targetDoc.mercenaries = destroyMercenaries(targetDoc.mercenaries);
				console.log("User won!");
				targetDoc.markModified('mercenaries');
				targetDoc.save(function(err){if(err) console.log(err);});
				res.end("Your troops defeated the enemy!");
			}else if (result==-1){
				userDoc.mercenaries = destroyMercenaries(userDoc.mercenaries);
				console.log("Target won!");
				userDoc.markModified('mercenaries');
				userDoc.save(function(err){if(err) console.log(err);});
				res.end("our troop has been defeated by the enemy!");
			}else{
				console.log("Draw!");
				res.end("The troops have drawn!");
			}
		});
	});
}