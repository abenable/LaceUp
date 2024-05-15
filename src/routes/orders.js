import express from 'express';
import logger from '../utils/logger.js';
import OrderModel from '../models/orders.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

// Retrieve all orders
router.get('/', async (req, res, next) => {
    try {
        const orders = await OrderModel.find();
        logger.info('Retrieved all orders');
        res.json(orders);
    } catch (error) {
        logger.error('Failed to retrieve orders', error);
        next(new ApiError(500, 'Failed to retrieve orders'));
    }
});

// Retrieve a single order by ID
router.get('/:id', async (req, res, next) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            logger.error('Order not found');
            next(new ApiError(404, 'Order not found'));
        } else {
            logger.info('Retrieved order by ID');
            res.json(order);
        }
    } catch (error) {
        logger.error('Failed to retrieve order by ID', error);
        next(new ApiError(500, 'Failed to retrieve order by ID'));
    }
});

// Create a new order
router.post('/', async (req, res, next) => {
    try {
        const newOrder = await OrderModel.create(req.body);
        logger.info('Created a new order');
        res.status(201).json(newOrder);
    } catch (error) {
        logger.error('Failed to create a new order', error);
        next(new ApiError(500, 'Failed to create a new order'));
    }
});

// Update an existing order
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            logger.error('Order not found');
            next(new ApiError(404, 'Order not found'));
        } else {
            logger.info('Updated an existing order');
            res.json(updatedOrder);
        }
    } catch (error) {
        logger.error('Failed to update an existing order', error);
        next(new ApiError(500, 'Failed to update an existing order'));
    }
});

// Delete an order
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            logger.error('Order not found');
            next(new ApiError(404, 'Order not found'));
        } else {
            logger.info('Deleted an order');
            res.json(deletedOrder);
        }
    } catch (error) {
        logger.error('Failed to delete an order', error);
        next(new ApiError(500, 'Failed to delete an order'));
    }
});

// Retrieve a single order item by ID
router.get('/order-items/:id', async (req, res, next) => {
    try {
        const orderItem = await OrderModel.findById(req.params.id);
        if (!orderItem) {
            logger.error('Order item not found');
            next(new ApiError(404, 'Order item not found'));
        } else {
            logger.info('Retrieved order item by ID');
            res.json(orderItem);
        }
    } catch (error) {
        logger.error('Failed to retrieve order item by ID', error);
        next(new ApiError(500, 'Failed to retrieve order item by ID'));
    }
});

// Create a new order item
router.post('/order-items', async (req, res, next) => {
    try {
        const newOrderItem = await OrderModel.create(req.body);
        logger.info('Created a new order item');
        res.status(201).json(newOrderItem);
    } catch (error) {
        logger.error('Failed to create a new order item', error);
        next(new ApiError(500, 'Failed to create a new order item'));
    }
});

// Update an existing order item
router.patch('/order-items/:id', async (req, res, next) => {
    try {
        const updatedOrderItem = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrderItem) {
            logger.error('Order item not found');
            next(new ApiError(404, 'Order item not found'));
        } else {
            logger.info('Updated an existing order item');
            res.json(updatedOrderItem);
        }
    } catch (error) {
        logger.error('Failed to update an existing order item', error);
        next(new ApiError(500, 'Failed to update an existing order item'));
    }
});

// Delete an order item
router.delete('/order-items/:id', async (req, res, next) => {
    try {
        const deletedOrderItem = await OrderModel.findByIdAndDelete(req.params.id);
        if (!deletedOrderItem) {
            logger.error('Order item not found');
            next(new ApiError(404, 'Order item not found'));
        } else {
            logger.info('Deleted an order item');
            res.json(deletedOrderItem);
        }
    } catch (error) {
        logger.error('Failed to delete an order item', error);
        next(new ApiError(500, 'Failed to delete an order item'));
    }
});

export { router as orderRouter };
