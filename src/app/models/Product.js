const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		brand: { type: String, required: true },
		description: { type: String },
		thumbnail: { type: String },
		images: { type: Array },
		videoId: { type: String, required: true },
		level: { type: String },
		slug: { type: String, slug: 'name', unique: true },
		category: { type: String, required: true },
		discount: { type: Number },
	},
	{
		timestamps: true,
	},
);

mongoose.plugin(slug);

module.exports = mongoose.model('Product', ProductSchema);
