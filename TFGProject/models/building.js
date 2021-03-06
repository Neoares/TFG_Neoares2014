var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var buildingSchema = new Schema({
	id: {type: String, requried: true},
	name: { type: String, required: true, trim: true, index: { unique: true } },
	level: { type: Number, required: true, default: 0},
	scalingValue: {type: Number, required: true, default: 2},
	costs: {
		wood: { type: Number, required: true, default:0},
		stone: { type:Number, required:true, default:0},
		iron: {type:Number, required:true, default:0},
		cereal: {type:Number, required:true, default:0}
	}
});

var building = mongoose.model('buildingModel', buildingSchema);

module.exports = {
		building: building
}