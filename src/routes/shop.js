const express = require('express');
const router = express.Router();

const shopController = require('../app/controllers/ShopController');

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/auth/login');
}

router.get('/cart', shopController.showCart);
router.put('/add-to-cart/:id', shopController.addToCart);
router.delete('/remove-from-cart/:id', shopController.removeFromCart);
router.get('/checkout', checkAuthenticated, shopController.showCheckout);
router.post('/checkout', checkAuthenticated, shopController.createOrder);

router.get('/:id', shopController.single);
router.get('/', shopController.index);

module.exports = router;
