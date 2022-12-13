const siteRouter = require('./site');
const shopRouter = require('./shop');
const authRouter = require('./auth');
const meRouter = require('./me');

function route(app) {
	app.use('/auth', authRouter);
	app.use('/shop', shopRouter);
	app.use('/me', meRouter);
	app.use('/', siteRouter);
}

module.exports = route;
