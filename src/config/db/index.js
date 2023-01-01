const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose
			.connect(process.env.DB_CONNECT, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then((m) => {
				console.log('Connecting to MongoDB succeeded.');
				return m.connection.getClient();
			});
	} catch (error) {
		console.log('Connecting to MongoDB failed.', error);
	}
}

module.exports = { connect };
