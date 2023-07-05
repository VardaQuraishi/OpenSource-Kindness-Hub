// Import required modules
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const ActOfKindness = require('../../models/actOfKindness');

// Middleware function to log requests
const logRequests = (req, res, next) => {
    logger.info('Received a request:', req.method, req.url);
    next(); // Call the next middleware or route handler
};

// Route handler for creating an act of kindness
router.post('/acts-of-kindness', (req, res) => {
    // Extract the necessary data from the request body
    const { title, category, description, image, tags } = req.body;

    // Create a new act of kindness using the Mongoose model
    const newActOfKindness = new ActOfKindness({
        title,
        category,
        description,
        image,
        tags
    });

    // Save the new act of kindness to the database
    newActOfKindness.save()
        .then(() => {
            res.status(201).json({ message: 'Act of kindness created successfully' });
        })
        .catch((error) => {
            logger.error('Error creating act of kindness:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Route handler for retrieving all acts of kindness
router.get('/acts-of-kindness', (req, res) => {
    ActOfKindness.find()
        .then((actsOfKindness) => {
            res.status(200).json(actsOfKindness);
        })
        .catch((error) => {
            logger.error('Error retrieving acts of kindness:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Route handler for retrieving a specific act of kindness
router.get('/acts-of-kindness/:id', (req, res) => {
    const { id } = req.params;

    ActOfKindness.findById(id)
        .then((actOfKindness) => {
            if (!actOfKindness) {
                return res.status(404).json({ error: 'Act of kindness not found' });
            }
            res.status(200).json(actOfKindness);
        })
        .catch((error) => {
            logger.error('Error retrieving act of kindness:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// Mount the middleware function to log requests
router.use(logRequests);

module.exports = router;
