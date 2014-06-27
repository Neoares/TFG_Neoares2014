var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, trim: true},
	usernameLower: { type: String, required: true, trim: true, index: { unique: true } },
	password: { type: String, required: true, trim: true},
	mail: { type: String, required: true, trim: true}
});

var user = mongoose.model('userModel', userSchema);

module.exports = {
		user: user
}