const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/zay_shop', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connecting to MongoDB succeeded.');
	} catch (error) {
		console.log('Connecting to MongoDB failed.');
	}
}

module.exports = { connect };
