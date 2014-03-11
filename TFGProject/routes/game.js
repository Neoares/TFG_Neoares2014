/**
 * New node file
 */

exports.index = function (req, res) {
	  res.render('./game/main', {name:req.session.name, menuOp:'Home'});
	  //console.log('session name: ' + req.session.name);
}

exports.buildings = function(req,res){
	res.render('./game/main', {name:req.session.name, menuOp:'Buildings'});
}

exports.research = function(req,res){
	res.render('./game/main', {name:req.session.name, menuOp:'Research'});
}

exports.mercenaries = function(req,res){
	res.render('./game/main', {name:req.session.name, menuOp:'Mercenaries'});
}