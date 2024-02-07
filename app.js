const express = require('express');
const morgan = require('morgan');
const menuRouter = require('./routes/menuRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
