/*
 * This file contains methods designed for handle 'get' or 'post' requests from the browser
 */

var user = require('../models/user').user;
var playerRoute = require('./player');


/*
 * Creates a new user.
 * This method is called by the register form.
 */
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
				if(!err){
					playerRoute.createByUser(newUser.username,res);	//calls the createByUser method in 'player.js' route.
					req.session.name = req.body.username;
					res.redirect('/game/index');
				}
				else res.json(500, {message: "could not create user, error: " + err});
			});
			
		}
		else if(!err) res.json(403, {message: "user with that name already exists, please update instead of create or create a new workout with a different name."});
		else res.json(500, {message: err});
	});
	
}


/*
 * Checks if the login data is OK.
 * This method is called by the signin form.
 */
exports.check = function(req, res){
	user.findOne({usernameLower:req.body.username.toLowerCase()}, function(err, doc){
		if(!err && doc){
			if(doc.password==req.body.password){
				req.session.name = doc.username;
				res.redirect('/game/index');
			}
			else{
				console.log('contraseña no válida');
				res.redirect('/');
			}
			
		}
		else{
			console.log('cuenta no existente');
			res.redirect('/');
		}
	});
	//res.render('./game/main', { title: 'Main' })
	
}