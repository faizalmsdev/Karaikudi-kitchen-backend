
// Import and configure dotenv to load environment variables from 'config.env'
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


// Step 1: Initializing the app and connecting to MongoDB
const app = require('./app'); // Importing the Express application
const mongoose = require('mongoose'); // Importing the Mongoose library for MongoDB


// Construct the MongoDB connection URI using environment variables
const dbConnectionUri = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_USERNAME>', process.env.DATABASE_USERNAME);

// Connect to MongoDB database using Mongoose
mongoose
    .connect(dbConnectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Start the server on the specified port (default is 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
