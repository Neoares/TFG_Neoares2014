var mongoose = require('mongoose');
var player = require('../models/player').player;
var gameRouter = require('../routes/game');


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
			}else if (result==-1){
				userDoc.mercenaries = destroyMercenaries(userDoc.mercenaries);
				console.log("Target won!");
				userDoc.markModified('mercenaries');
				userDoc.save(function(err){if(err) console.log(err);});
			}else{
				console.log("Draw!");
			}
		});
	});
	res.redirect("");
}