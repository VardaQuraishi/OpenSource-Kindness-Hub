const mongoose = require('mongoose');
const express = require('express');
const logger = require('../logger');

const actsOfKindnessRouter = express.Router();
const app = express();

// Database connection
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

// Mounting the router middleware
app.use('/api', actsOfKindnessRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
