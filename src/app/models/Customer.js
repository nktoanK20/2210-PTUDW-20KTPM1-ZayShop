const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CustomerSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		phoneNumber: { type: String },
		addresses: { type: Array },
		payments: { type: Array },
	},
	{
		timestamps: true,
	},
);

CustomerSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

CustomerSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Customer', CustomerSchema);
