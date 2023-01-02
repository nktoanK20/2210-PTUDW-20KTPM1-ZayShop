const Order = require('../models/Order');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class OrderService {
	getOne(key, value) {
		return Order.findOne({ [key]: value }).then((order) => {
			return mongooseToObject(order);
		});
	}

	get(customerId) {
		return Order.find({ customerId: customerId })
			.sort({ createdAt: 'desc' })
			.then((orders) => {
				return multipleMongooseToObject(orders);
			});
	}

	save(data) {
		const order = new Order(data);
		return order.save();
	}
}

module.exports = new OrderService();
