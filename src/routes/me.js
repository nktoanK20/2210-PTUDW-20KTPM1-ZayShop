const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/auth/login');
});

router.get('/settings', meController.showSettings);
router.put('/settings', meController.updateSettings);
router.get('/', meController.showProfile);
router.put('/', meController.updateProfile);

module.exports = router;
