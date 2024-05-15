import express from 'express';
import logger from '../utils/logger.js';
import { ProductModel } from '../models/products.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

// GET /products (Retrieve all products)
router.get('/', async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        logger.info('Retrieved all products');
        res.json(products);
    } catch (error) {
        logger.error('Failed to retrieve products', error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// GET /products/{id} (Retrieve a single product by ID)
router.get('/:id', async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
            logger.info(`Retrieved product with ID: ${req.params.id}`);
            res.json(product);
        } else {
            logger.warn(`Product with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'product not found'));
        }
    } catch (error) {
        logger.error(`Failed to retrieve product with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// POST /products (Create a new product)
router.post('/', async (req, res, next) => {
    try {
        const newproduct = await ProductModel.create(req.body);
        logger.info('Created a new product');
        res.status(201).json(newproduct);
    } catch (error) {
        logger.error(error);
        next(new ApiError(500, 'Failed to create a new product'));
    }
});

// PATCH /products/{id} (Update an existing product)
router.patch('/:id', async (req, res, next) => {
    try {
        const updatedproduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedproduct) {
            logger.info(`Updated product with ID: ${req.params.id}`);
            res.json(updatedproduct);
        } else {
            logger.warn(`Product with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'product not found'));
        }
    } catch (error) {
        logger.error(`Failed to update product with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});

// DELETE /products/{id} (Delete a product)
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedproduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (deletedproduct) {
            logger.info(`Deleted product with ID: ${req.params.id}`);
            res.json({ message: 'Product deleted successfully' });
        } else {
            logger.warn(`Product with ID: ${req.params.id} not found`);
            next(new ApiError(404, 'Product not found'));
        }
    } catch (error) {
        logger.error(`Failed to delete Product with ID: ${req.params.id}`, error);
        next(new ApiError(500, 'Internal server error'));
    }
});


export { router as productRouter };
