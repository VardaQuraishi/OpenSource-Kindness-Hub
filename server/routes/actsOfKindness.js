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
    const { title, category, description, image, tags, testData } = req.body;

    // Create a new act of kindness using the Mongoose model
    const newActOfKindness = new ActOfKindness({
        title,
        category,
        description,
        image,
        tags,
        testData: testData || false // Set testData to true if provided, otherwise set it to false
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
            if (error.name === 'CastError') {
                return res.status(404).json({ error: 'Act of kindness not found' });
            }
            logger.error('Error retrieving act of kindness:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Route handler for updating an act of kindness
router.put('/acts-of-kindness/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, image, tags } = req.body;

        const updatedActOfKindness = await ActOfKindness.findByIdAndUpdate(
            id,
            { title, category, description, image, tags },
            { new: true }
        );

        if (!updatedActOfKindness) {
            return res.status(404).json({ error: 'Act of kindness not found' });
        }

        res.status(200).json({ message: 'Act of kindness updated successfully' });
    } catch (error) {
        logger.error('Error updating act of kindness:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for deleting an act of kindness
router.delete('/acts-of-kindness/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedActOfKindness = await ActOfKindness.findByIdAndRemove(id);

        if (!deletedActOfKindness) {
            return res.status(404).json({ error: 'Act of kindness not found' });
        }

        res.status(200).json({ message: 'Act of kindness deleted successfully' });
    } catch (error) {
        logger.error('Error deleting act of kindness:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Mount the middleware function to log requests
router.use(logRequests);

module.exports = router;
