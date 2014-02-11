function fillPlayers(playerCollection, player){
	playerCollection.drop();
	var go;
	for(var i=1; i<51; i++){
		player.name='user'+i;
		go=false;
		playerCollection.insert(player,function (err, inserted) {
			if(err) console.log(err);
			else go=true;
		});
		console.log(go);
		while(!go){}
	}
}

exports.fillPlayers = fillPlayers;