/**
 * New node file
 */

exports.index = function (req, res) {
	  res.render('./game/main', {name:req.session.name});
	  //console.log('session name: ' + req.session.name);
}