module.exports = function SortMiddleware(req, res, next) {
	res.locals._sort = {
		sortBy: 'createdAt',
		sortType: 'desc',
	};
	if (req.query.sortBy) {
		Object.assign(res.locals._sort, {
			sortBy: req.query.sortBy,
			sortType: req.query.sortType,
		});
	}

	if (req.query.category) {
		const categories = {
			shirts_men: 'Shirts Men',
			shirts_women: 'Shirts Women',
			shirts_others: 'Shirts Others',
			shoes_men: 'Shoes Men',
			shoes_women: 'Shoes Women',
			shoes_others: 'Shoes Others',
			accessories_hats: 'Accessories Hats',
			accessories_gloves: 'Accessories Gloves',
			accessories_watches: 'Accessories Watches',
		};
		res.locals.category = req.query.category;
		res.locals.category_name = categories[req.query.category];
	} else {
		res.locals.category_name = 'All Products';
	}

	next();
};
