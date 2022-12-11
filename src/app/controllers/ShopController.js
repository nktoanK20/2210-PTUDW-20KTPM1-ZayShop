const Product = require('../models/Product');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');
const { response } = require('express');

class ShopController {
	// [GET] /:id (detail of a product in shop)
	single(req, res, next) {
		Product.findOne({})
			.then((product) => {
				res.render('shop/single', {
					product: mongooseToObject(product),
				});
			})
			.catch(next);
	}

	// [GET] /index (shop section homepage)
	index(req, res, next) {
		let productQuery;
		if (req.query.category) {
			productQuery = Product.find({ category: req.query.category });
		} else {
			productQuery = Product.find();
		}

		if (req.query.sortBy) {
			productQuery = productQuery.sort({
				[req.query.sortBy]: req.query.sortType,
			});
		} else {
			productQuery = productQuery.sort({
				createdAt: 'desc',
			});
		}

		Promise.all([productQuery])
			.then(([products]) => {
				res.render('shop/index', {
					products: multipleMongooseToObject(products),
				});
			})
			.catch(next);
	}
}

module.exports = new ShopController();
