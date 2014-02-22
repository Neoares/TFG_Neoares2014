/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */

var user = require('../models/user').user;

exports.create = function(req, res){
	var usernameLower = req.body.username.toLowerCase();
	var gamenameLower = req.body.gamename.toLowerCase();
	
	user.findOne({usernameLower: usernameLower}, function(err, doc){
		if(!err && !doc){
			user.findOne({gamenameLower: gamenameLower}, function(err, doc){
				if(!err && !doc){
					var newUser = new user();
					
					newUser.username = req.body.username;
					newUser.usernameLower = usernameLower;
					newUser.password = req.body.password;
					newUser.mail = req.body.mail;
					newUser.gamename = req.body.gamename;
					newUser.gamenameLower = gamenameLower;
					
					newUser.save(function(err){
						if(!err) res.json(201, {message: "user created with name: " + newUser.username});
						else res.json(500, {message: "could not create user, error: " + err});
					});
				}
				else if(!err) res.json(403, {message: "player with that name already exists, please update instead of create or create a new workout with a different name."});
				else res.json(500, {message: err});
			});
		}
		else if(!err) res.json(403, {message: "user with that name already exists, please update instead of create or create a new workout with a different name."});
		else res.json(500, {message: err});
	});
	
}