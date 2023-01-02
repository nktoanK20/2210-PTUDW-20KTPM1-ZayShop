const ProductService = require('../models/ProductService');
const OrderService = require('../models/OrderService');
let Cart = require('../models/Cart');

class ShopController {
	//[GET] /cart
	async showCart(req, res, next) {
		let cart;
		let items;
		if (!req.session.cart) {
			cart = new Cart({});
			items = null;
		} else {
			cart = new Cart(req.session.cart);
			items = cart.getItemsArray();
		}
		res.render('shop/cart', {
			items,
			totalPrice: cart.totalPrice,
			shippingPrice: 0,
			totalItems: Object.keys(cart.items).length,
		});
	}

	// [PUT] /add-to-cart/:id
	async addToCart(req, res, next) {
		let productId = req.params.id;
		let productQuantity = req.body.quantity ? Number(req.body.quantity) : 1;
		let cart = new Cart(req.session.cart ? req.session.cart : {});
		let product = await ProductService.getOne('_id', productId);
		if (
			cart.items[productId] &&
			cart.items[productId].quantity + productQuantity > product.quantity
		) {
			productQuantity = product.quantity - cart.items[productId].quantity;
		}
		cart.add(product, product._id, productQuantity);
		req.session.cart = cart;
		res.redirect(req.get('referer'));
	}

	// [GET] /checkout
	showCheckout(req, res, next) {
		if (!req.session.cart) {
			res.redirect('/shop/cart');
		}
		let cart;
		let items;
		if (!req.session.cart) {
			cart = new Cart({});
			items = null;
		} else {
			cart = new Cart(req.session.cart);
			items = cart.getItemsArray();
		}
		res.render('shop/checkout', {
			items,
			totalPrice: cart.totalPrice,
			shippingPrice: 0,
			totalItems: Object.keys(cart.items).length,
		});
	}

	// [POST] /checkout
	async createOrder(req, res, next) {
		let shippingDetails = {};
		shippingDetails['firstName'] = req.body.firstName;
		shippingDetails['lastName'] = req.body.lastName;
		shippingDetails['address'] = req.body.address;
		shippingDetails['country'] = req.body.country;
		shippingDetails['city'] = req.body.city;
		shippingDetails['zipCode'] = req.body.zipCode;

		let order = new Cart(req.session.cart);
		order['customerId'] = req.user._id;
		order['shippingDetails'] = shippingDetails;
		order['paymentMethod'] = req.body.paymentMethod;

		await OrderService.save(order);

		res.redirect('/me/orders?message=Create order successful!');
	}

	// [GET] /:id (detail of a product in shop)
	async single(req, res, next) {
		const product = await ProductService.getOne('_id', req.params.id);
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
