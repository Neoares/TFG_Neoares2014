var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var building = require('./building').building;

function funcionchula(){
	return ['edificio1','edificio2','etc'];
}

var playerSchema = new Schema({
	name: { type: String, required: true, trim: true, index: { unique: true } },
	wood: { type: Number, required: true, default: 500},
	woodPerHour: { type: Number, required: true, default: 40},
	buildings: { type: Array, required: true, default: initBuildings()}
});

var player = mongoose.model('playerModel', playerSchema);

module.exports = {
		player: player
}