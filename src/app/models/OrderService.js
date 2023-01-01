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
		return Order.find({ customerId: customerId }).then((order) => {
			return mongooseToObject(order);
		});
	}

	save(data) {
		const order = new Order(data);
		return order.save();
	}
}

module.exports = new OrderService();
