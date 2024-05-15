import express from 'express';
import logger from '../utils/logger.js';
import { PaymentModel } from '../models/orders.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

// GET /payments (Retrieve all payments)
router.get('/', async (req, res, next) => {
    try {
        const payments = await PaymentModel.find();
        logger.info('Retrieved all payments');
        res.json(payments);
    } catch (error) {
        logger.error('Failed to retrieve payments', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// GET /payments/{id} (Retrieve a single payment by ID)
router.get('/:id', async (req, res, next) => {
    try {
        const payment = await PaymentModel.findById(req.params.id);
        if (payment) {
            logger.info(`Retrieved payment with ID: ${req.params.id}`);
            res.json(payment);
        } else {
            logger.warn(`payment with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'payment not found'));
        }
    } catch (error) {
        logger.error(`Failed to retrieve payment with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// POST /payments (Create a new payment)
router.post('/', async (req, res, next) => {
    try {
        const newpayment = await PaymentModel.create(req.body);
        logger.info('Created a new payment');
        res.status(201).json(newpayment);
    } catch (error) {
        logger.error(error);
        next(new ApiError(500, 'Failed to create a new payment'));
    }
});

// PATCH /payments/{id} (Update an existing payment)
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedpayment = await PaymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedpayment) {
            logger.info(`Updated payment with ID: ${req.params.id}`);
            res.json(updatedpayment);
        } else {
            logger.warn(`payment with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'payment not found'));
        }
    } catch (error) {
        logger.error(`Failed to update payment with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// DELETE /payments/{id} (Delete a payment)
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedpayment = await PaymentModel.findByIdAndDelete(req.params.id);
        if (deletedpayment) {
            logger.info(`Deleted payment with ID: ${req.params.id}`);
            res.json({ message: 'payment deleted successfully' });
        } else {
            logger.warn(`payment with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'payment not found'));
        }
    } catch (error) {
        logger.error(`Failed to delete payment with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});


export { router as paymentRouter };
