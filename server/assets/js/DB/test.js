function fillPlayers(playerCollection, player, ObjectID){
	playerCollection.drop();
	for(var i=1; i<51; i++){
		player.name='user'+i;
		player._id = ObjectID();
		playerCollection.insert(player,function (err, inserted) {
			if(err) console.log(err);
		});
	}
}

exports.fillPlayers = fillPlayers;