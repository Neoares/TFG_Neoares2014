var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var buildingSchema = new Schema({
	name: { type: String, required: true, trim: true, index: { unique: true } },
	level: { type: Number, required: true, default: 0},
	scalingValue: {type: Number, required: true, default: 2},
	woodCost: { type: Number, required: true},
	
});

var player = mongoose.model('buildingModel', playerSchema);

module.exports = {
		building: building
}