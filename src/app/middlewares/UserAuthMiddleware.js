module.exports = function (req, res, next) {
	if (req.user) {
		console.log(req.user);
		res.locals.user = req.user;
	}

	next();
};
