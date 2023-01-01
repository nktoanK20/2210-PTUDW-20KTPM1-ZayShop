module.exports = function Cart(oldCart) {
	this.items = oldCart.items || {};
	this.totalQuantity = oldCart.totalQuantity || 0;
	this.totalPrice = oldCart.totalPrice || 0;

	this.add = function (product, id, quantity) {
		var storedItem = this.items[id];
		if (!storedItem) {
			storedItem = this.items[id] = {
				product: product,
				quantity: 0,
				price: 0,
			};
		}
		storedItem.quantity += quantity;
		storedItem.price += storedItem.product.price * quantity;
		this.totalQuantity += quantity;
		this.totalPrice += storedItem.product.price * quantity;
	};

	// convert objects to array
	this.getItemsArray = function () {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};
};
