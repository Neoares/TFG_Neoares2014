var mongoose = require('mongoose');
var playerModel = require('../../models/player').player;

var time;

function autoUpdateResources(){
	time=setInterval(function(){		
		/*player.find({}, 'wood', function(err, docs){
			if(err) console.log("error en el find: " + err);
			else if(!err && !docs) console.log("no hay players. error: " + err);
			else{
				docs.each(function(err, doc){
					if(err) console.log("error en el each: " + err);
					else{
						doc.update({wood: wood+1}, function(err, query){
							if(err) console.log("error en el update: " + err);
						});
					}
				});
			}
		});*/
		playerModel.update({}, {$inc:{wood:1}}, function(err){
			if(err) console.log("error al update: " + err);
		});
		console.log('updated resources');
		},1000);
}

function init(){
	mongoose.connect('mongodb://localhost:27017/test');
	//mongoose.connection.collections['usermodels'].drop(function(err){ if(err) console.log(err)});
	//mongoose.connection.collections['playermodels'].drop(function(err){ if(err) console.log(err)});
	console.log('db init');
	autoUpdateResources();
}

exports.init = init;