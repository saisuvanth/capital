const { Router } = require('express');
const { login, register, getItems, addItem, purchaseItem } = require('../controllers/userController');
const { getUser } = require('../middlewares');
const authRouter = Router();

authRouter.post('/login', login)

authRouter.post('/register', register)

authRouter.get('/get-user', getUser, (req, res, next) => {
	res.status(200).json(req.user);
});

authRouter.post('/purchase', getUser, purchaseItem);

authRouter.get('/get-items', getUser, getItems);

authRouter.post('/add-item', getUser, addItem);

module.exports = authRouter