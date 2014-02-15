var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var playerSchema = new Schema({
	name: { type: String, required: true, trim: true, index: { unique: true } },
	wood: { type: Number, required: true, default: 500}
});

var player = mongoose.model('playerModel', playerSchema);

module.exports = {
		player: player
}