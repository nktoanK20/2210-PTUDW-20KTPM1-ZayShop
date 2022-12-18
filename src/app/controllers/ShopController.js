const ProductService = require('../models/ProductService');

class ShopController {
	// [GET] /:id (detail of a product in shop)
	async single(req, res, next) {
		const product = await ProductService.getOne('_id', req.params.id);
		console.log(product);
		res.render('shop/single', { product });
	}

	// [GET] /index (shop section homepage)
	async index(req, res, next) {
		let page = 0;
		if (req.query.page > 0) {
			page = req.query.page - 1;
		}
		const limit = process.env.LIMIT_PER_PAGE;

		let products = await ProductService.get(
			req.query.category,
			req.query.sortBy,
			req.query.sortType,
			page,
			limit,
		);

		const totalPages = Math.ceil(
			(await ProductService.count(req.query.category)) / limit,
		);

		res.render('shop/index', {
			products,
			totalPages,
			currentPage: page + 1,
		});
	}
}

module.exports = new ShopController();
