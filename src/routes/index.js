const siteRouter = require('./site');
const shopRouter = require('./shop');
const authRouter = require('./auth');

function route(app) {
	app.use('/auth', authRouter);
	app.use('/shop', shopRouter);
	app.use('/', siteRouter);
}

module.exports = route;
