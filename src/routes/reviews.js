import express from 'express';
import logger from '../utils/logger.js';
import { ReviewModel } from '../models/products.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

// GET /reviews (Retrieve all reviews)
router.get('/', async (req, res, next) => {
    try {
        const reviews = await ReviewModel.find();
        logger.info('Retrieved all reviews');
        res.json(reviews);
    } catch (error) {
        logger.error('Failed to retrieve reviews', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// GET /reviews/{id} (Retrieve a single review by ID)
router.get('/:id', async (req, res, next) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (review) {
            logger.info(`Retrieved review with ID: ${req.params.id}`);
            res.json(review);
        } else {
            logger.warn(`review with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'review not found'));
        }
    } catch (error) {
        logger.error(`Failed to retrieve review with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// POST /reviews (Create a new review)
router.post('/', async (req, res, next) => {
    try {
        const newreview = await ReviewModel.create(req.body);
        logger.info('Created a new review');
        res.status(201).json(newreview);
    } catch (error) {
        logger.error(error);
        next(new ApiError(500, 'Failed to create a new review'));
    }
});

// PATCH /reviews/{id} (Update an existing review)
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedreview = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedreview) {
            logger.info(`Updated review with ID: ${req.params.id}`);
            res.json(updatedreview);
        } else {
            logger.warn(`review with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'review not found'));
        }
    } catch (error) {
        logger.error(`Failed to update review with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// DELETE /reviews/{id} (Delete a review)
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedreview = await ReviewModel.findByIdAndDelete(req.params.id);
        if (deletedreview) {
            logger.info(`Deleted review with ID: ${req.params.id}`);
            res.json({ message: 'review deleted successfully' });
        } else {
            logger.warn(`review with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'review not found'));
        }
    } catch (error) {
        logger.error(`Failed to delete review with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});


export { router as reviewRouter };
