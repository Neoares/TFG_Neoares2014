/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */

var user = require('../models/user').user;
var playerRoute = require('./player');

exports.create = function(req, res){
	var usernameLower = req.body.username.toLowerCase();
	
	user.findOne({usernameLower: usernameLower}, function(err, doc){
		if(!err && !doc){
			var newUser = new user();
					
			newUser.username = req.body.username;
			newUser.usernameLower = usernameLower;
			newUser.password = req.body.password;
			newUser.mail = req.body.mail;
					
			newUser.save(function(err){
				if(!err) res.render('./game/main', {username: req.body.username});
				else res.json(500, {message: "could not create user, error: " + err});
			});
			playerRoute.createByUser(newUser.username);	//calls the createByUser method in 'player.js' route.
		}
		else if(!err) res.json(403, {message: "user with that name already exists, please update instead of create or create a new workout with a different name."});
		else res.json(500, {message: err});
	});
	
}

exports.check = function(req, res){
	user.findOne({usernameLower:req.body.username.toLowerCase()}, function(err, doc){
		if(!err && doc){
			if(doc.password==req.body.password) res.render('./game/main', { username: req.body.username});
			else console.log('contraseña no válida');
		}
		else console.log('cuenta no existente');
	});
	//res.render('./game/main', { title: 'Main' })
	
}