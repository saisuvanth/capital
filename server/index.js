require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const app = express();
const { connect } = require('mongoose');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookie());

app.use('/', authRouter);


app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status).json({ message: err });
})

connect(process.env.MONGO_URI).then(res => {
	console.log('Connected to DB');
	app.listen(process.env.PORT, () => console.log(`listening to ${process.env.PORT}`))
}).catch(err => console.log(`${err} occured`));