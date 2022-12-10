const { User, Item } = require('../models');
const { sign, verify } = require('jsonwebtoken');
const Items = require('../models/Items');

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const us = await User.findUser(username, password);
		const token = sign({ id: us._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.status(200).json({ message: 'Logged In successfully', token })
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;
	console.log(username, email, password)
	try {
		const us = new User({ username, email, password, items: [], purchases: [] });
		const savU = await us.save();
		res.status(200).json({ message: 'User created successfully' });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
}

exports.addItem = async (req, res, next) => {
	try {
		const user = req.user;
		const item = req.body;
		const it = new Item(item);
		const svIt = await it.save();
		if (svIt) {
			await User.updateOne({ _id: user._id }, { $push: { 'items': svIt._id } });
			res.status(200).json({ message: 'Item added' });
		}
	} catch (err) {
		console.log(err);
	}
}

exports.purchaseItem = async (req, res, next) => {
	const user = req.user;
	const item = req.body;
	console.log(user, item);
	try {
		const it = await Item.updateOne({ _id: item.id }, { status: 'sold' });
		console.log(it);
		const us = await User.updateOne({ _id: user._id }, { $push: { purchases: item.id } });
		res.status(200).json({ message: 'Successfully purchases' });
	} catch (err) {
		console.log(err);
	}
}

exports.getItems = async (req, res, next) => {
	try {
		const items = await Item.find({ status: 'unsold' });
		res.status(200).json(items);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
}