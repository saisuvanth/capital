const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		default: 'unsold',
		enum: ['sold', 'unsold']
	}
})


module.exports = model('items', ItemSchema);