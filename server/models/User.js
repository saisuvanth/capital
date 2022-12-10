const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail')
const bcryptjs = require('bcryptjs');
const { verify } = require('jsonwebtoken');

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: isEmail,
			message: `{VALUE} is not a valid email`
		}
	},
	password: {
		type: String,
		required: true,
	},
	items: [{
		type: Schema.Types.ObjectId,
		ref: 'items'
	}],
	purchases: [{
		type: Schema.Types.ObjectId,
		ref: 'items'
	}]
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObj = user.toObject()
	delete userObj.password;
	return userObj;
}

UserSchema.statics.findUser = async function (username, password) {
	const User = this;
	const us = await User.findOne({ username });
	if (us) {
		try {
			const res = await us.comparePassword(password)
			return res;
		} catch (err) { throw 'User Credentials wrong' }
	} else throw 'User Credentials wrong';
}

UserSchema.methods.comparePassword = async function (password) {
	const user = this;
	return bcryptjs.compare(password, user.password).then((isMatch) => {
		if (!isMatch) {
			return Promise.reject();
		}
		return user;
	});
}

UserSchema.statics.findByToken = async function (token) {
	let User = this;
	let decoded;
	try {
		decoded = verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}
	return User.findOne({
		_id: decoded.id,
	}).populate('items').populate('purchases');
};

UserSchema.pre('save', function (next) {
	let user = this;
	if (user.isModified('password')) {
		bcryptjs.genSalt(10).then((salt, err) => {
			if (err) throw err;
			bcryptjs.hash(user.password, salt, (er, hash) => {
				if (er) throw er;
				user.password = hash;
				return next();
			});
		});
	} else return next();
})

module.exports = model('user', UserSchema);