// Import required modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../logger');

// Import actsOfKindnessRouter from './routes/actsOfKindness'
const actsOfKindnessRouter = require('./routes/actsOfKindness');

// Create an Express application
const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
    logger.info('Incoming request:', req.method, req.url);
    next();
});

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/KindActions', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        logger.info('Connected to the MongoDB database');
    })
    .catch((error) => {
        logger.error('Error connecting to the MongoDB database:', error);
    });

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Mount the actsOfKindnessRouter middleware under the '/api' route
app.use('/api', actsOfKindnessRouter);

// Start the server and listen on port 3000
const port = 3000;
const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

module.exports = { app, server }; // Export both 'app' and 'server' objects
