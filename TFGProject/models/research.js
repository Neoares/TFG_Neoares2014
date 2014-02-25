var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var researchSchema = new Schema({
	name: { type: String, required: true, trim: true, index: { unique: true } },
	level: { type: Number, required: true, default: 0},
	scalingValue: {type: Number, required: true, default: 2},
	woodCost: { type: Number, required: true}
});

var research = mongoose.model('researchModel', researchSchema);

module.exports = {
		research: research
}