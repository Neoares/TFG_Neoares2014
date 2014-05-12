var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var mercenarySchema = new Schema({
	id: {type: String, requried: true},
	name: { type: String, required: true, trim: true, index: { unique: true } },
	quantity: { type: Number, required: true, default: 0},
	costs: {
		wood: { type: Number, required: true, default:0},
		stone: { type:Number, required:true, default:0},
		iron: {type:Number, required:true, default:0},
	},
	stats: {
		hp: { type: Number, required: true, default:0},
		shield: { type: Number, required: true, default:0},
		attack: { type: Number, required: true, default:0},
		speed: { type: Number, required: true, default:0}
	},
	barracksLevel: { type: Number, required: true, default: 0}
	
});

var mercenary = mongoose.model('mercenaryModel', mercenarySchema);

module.exports = {
		mercenary: mercenary
}