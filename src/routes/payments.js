import express from 'express';

const router = express.Router();

// GET /payments (Retrieve all payments)
router.get('/payments', (req, res) => {
    // Your code here
});

// GET /payments/{id} (Retrieve a single payment by ID)
router.get('/payments/:id', (req, res) => {
    // Your code here
});

// POST /payments (Create a new payment)
router.post('/payments', (req, res) => {
    // Your code here
});

// PATCH /payments/{id} (Update an existing payment)
router.patch('/payments/:id', (req, res) => {
    // Your code here
});

// DELETE /payments/{id} (Delete a payment)
router.delete('/payments/:id', (req, res) => {
    // Your code here
});

export { router as paymentRouter };