const { User } = require('./models');

exports.getUser = async (req, res, next) => {
	let token;
	if (req.headers.authorization?.startsWith('Bearer'))
		token = req.headers.authorization.split(' ')[1];
	if (token) {
		const us = await User.findByToken(token);
		if (us) {
			req.user = us;
			next();
		} else next('Please Login again');
	} else {
		next('Please Login again');
	}
}