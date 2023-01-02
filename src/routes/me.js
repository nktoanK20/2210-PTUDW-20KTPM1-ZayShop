const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/auth/login');
});

router.get('/profile', meController.showProfileSettings);
router.put('/profile', meController.updateProfileSettings);
router.get('/account', meController.showAccountSettings);
router.put('/account', meController.updateAccountSettings);
router.get('/order-detail/:id', meController.showOrderDetail);
router.get('/orders', meController.showOrders);

module.exports = router;
