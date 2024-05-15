import express from 'express';
import logger from '../utils/logger.js';
import customerModel from '../models/customers.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

// GET /customers (Retrieve all customers)
router.get('/', async (req, res, next) => {
    try {
        const customers = await customerModel.find();
        logger.info('Retrieved all customers');
        res.json(customers);
    } catch (error) {
        logger.error('Failed to retrieve customers', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// GET /customers/{id} (Retrieve a single customer by ID)
router.get('/:id', async (req, res, next) => {
    try {
        const customer = await customerModel.findById(req.params.id);
        if (customer) {
            logger.info(`Retrieved customer with ID: ${req.params.id}`);
            res.json(customer);
        } else {
            logger.warn(`Customer with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'Customer not found'));
        }
    } catch (error) {
        logger.error(`Failed to retrieve customer with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// POST /customers (Create a new customer)
router.post('/', async (req, res, next) => {
    try {
        const existingCustomer = await customerModel.findOne({ email: req.body.email });
        if (existingCustomer) {
            logger.warn(`Customer with email: ${req.body.email} already exists`);
            next(new ApiError(400, 'Customer already exists, use a different email address'));
        }
        // check phonenumber too
        const existingPhoneNumber = await customerModel.findOne({ phoneNumber: req.body.phoneNumber });
        if (existingPhoneNumber) {
            logger.warn(`Customer with phone number: ${req.body.phoneNumber} already exists`);
            next(new ApiError(400, 'Customer already exists, use a different phone number'));
        }

        const newCustomer = await customerModel.create(req.body);

        logger.info('Created a new customer');
        res.status(201).json(newCustomer);
    } catch (error) {
        logger.error(error);
        next(new ApiError(500, 'Failed to create a new customer'));
    }
});

// PATCH /customers/{id} (Update an existing customer)
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedCustomer = await customerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedCustomer) {
            logger.info(`Updated customer with ID: ${req.params.id}`);
            res.json(updatedCustomer);
        } else {
            logger.warn(`Customer with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'Customer not found'));
        }
    } catch (error) {
        logger.error(`Failed to update customer with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// DELETE /customers/{id} (Delete a customer)
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id);
        if (deletedCustomer) {
            logger.info(`Deleted customer with ID: ${req.params.id}`);
            res.json({ message: 'Customer deleted successfully' });
        } else {
            logger.warn(`Customer with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'Customer not found'));
        }
    } catch (error) {
        logger.error(`Failed to delete customer with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// GET /shipping-addresses/{id} (Retrieve a single shipping address by ID)
router.get('/shipping-addresses/:id', async (req, res, next) => {
    try {
        // Your code here
    } catch (error) {
        logger.error(`Failed to retrieve shipping address with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// POST /shipping-addresses (Create a new shipping address)
router.post('/shipping-addresses', async (req, res, next) => {
    try {
        // Your code here
    } catch (error) {
        logger.error('Failed to create a new shipping address', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// PATCH /shipping-addresses/{id} (Update an existing shipping address)
router.patch('/shipping-addresses/:id', async (req, res, next) => {
    try {
        // Your code here
    } catch (error) {
        logger.error(`Failed to update shipping address with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// DELETE /shipping-addresses/{id} (Delete a shipping address)
router.delete('/shipping-addresses/:id', async (req, res, next) => {
    try {
        // Your code here
    } catch (error) {
        logger.error(`Failed to delete shipping address with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

export { router as customerRouter };
