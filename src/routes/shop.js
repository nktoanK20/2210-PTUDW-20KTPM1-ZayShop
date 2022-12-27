const express = require('express');
const router = express.Router();

const shopController = require('../app/controllers/ShopController');

router.get('/cart', shopController.showCart);
router.get('/:id', shopController.single);
router.get('/', shopController.index);

module.exports = router;
