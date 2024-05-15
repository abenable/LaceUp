import express from 'express';

const router = express.Router();

// GET /reviews (Retrieve all reviews)
router.get('/reviews', (req, res) => {
    // Your code to retrieve all reviews goes here
});

// GET /reviews/{id} (Retrieve a single review by ID)
router.get('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    // Your code to retrieve a single review by ID goes here
});

// POST /reviews (Create a new review)
router.post('/reviews', (req, res) => {
    // Your code to create a new review goes here
});

// PATCH /reviews/{id} (Update an existing review)
router.patch('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    // Your code to update an existing review goes here
});

// DELETE /reviews/{id} (Delete a review)
router.delete('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    // Your code to delete a review goes here
});

export { router as reviewRouter };