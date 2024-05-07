const express = require('express');
const morgan = require('morgan');
const menuRouter = require('./routes/menuRoute');
const userRouter = require('./routes/userRoute'); 
const reviewRouter = require('./routes/reviewRoute');
const path = require('path');

const app = express();

// Importing cors 
const cors = require('cors');
// Use cors middleware to handle CORS headers
app.use(cors({ origin: '*' }));

app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/users', userRouter); 
app.use('/api/v1/review', reviewRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
