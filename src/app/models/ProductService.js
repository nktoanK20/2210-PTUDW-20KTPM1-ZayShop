const Product = require('../models/Product');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class ProductService {
	getOne(key, value) {
		return Product.findOne({ [key]: value }).then((product) => {
			return mongooseToObject(product);
		});
	}

	get(category, sortBy, sortType, minPrice, maxPrice, page, limit) {
		let _category = 'all';
		let _sortBy = 'createdAt';
		let _sortType = 'desc';
		let _minPrice = 0;
		let _maxPrice = Infinity;

		if (category != 'all' && category) {
			_category = category;
		}

		if (sortBy) {
			_sortBy = sortBy;
			_sortType = sortType;
			_minPrice = minPrice ? minPrice : _minPrice;
			_maxPrice = maxPrice ? maxPrice : _maxPrice;
		}

		let querySelector =
			_category === 'all'
				? {
						price: {
							$gte: _minPrice,
							$lte: _maxPrice,
						},
				  }
				: {
						price: {
							$gte: _minPrice,
							$lte: _maxPrice,
						},
						category: _category,
				  };
		return Product.find(querySelector)
			.skip(page * limit)
			.limit(limit)
			.sort({ [_sortBy]: _sortType })
			.then((products) => {
				return multipleMongooseToObject(products);
			});
	}

	count(category, minPrice, maxPrice) {
		let _category = 'all';
		let _minPrice = 0;
		let _maxPrice = Infinity;
		_minPrice = minPrice ? minPrice : _minPrice;
		_maxPrice = maxPrice ? maxPrice : _maxPrice;

		if (category != 'all' && category) {
			_category = category;
		}

		let querySelector =
			_category === 'all'
				? {
						price: {
							$gte: _minPrice,
							$lte: _maxPrice,
						},
				  }
				: {
						price: {
							$gte: _minPrice,
							$lte: _maxPrice,
						},
						category: _category,
				  };
		return Product.countDocuments(querySelector).then((total) => {
			return total;
		});
	}
}

module.exports = new ProductService();
