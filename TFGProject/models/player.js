var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var playerSchema = new Schema({
	name: { type: String, required: true, trim: true, index: { unique: true } },
	score: { type: Number, required: true, default:  0},
	resources: {
		wood: { type: Number, required: true, default: 500},
		stone: { type: Number, required: true, default: 300},
		iron: { type: Number, required: true, default: 0},
		cereal: { type: Number, required: true, default: 0}
	},
	resourcesPerHour: {
		woodPerHour: { type: Number, required: true, default: 40},
		stonePerHour: { type: Number, required: true, default: 20},
		ironPerHour: { type: Number, required: true, default: 0},
	},
	cerealAvailable: {type: Number, required: true, default: 0},
	res: {type: Array, required:true, default: []},
	buildings: { type: Array, required: true, default: []},
	researches: { type: Array, required: true, default: []}
});

var player = mongoose.model('playerModel', playerSchema);

module.exports = {
		player: player
}