import { Router } from 'express';
import { customerRouter } from '../routes/customers.js';
import { orderRouter } from '../routes/orders.js';
import { productRouter } from '../routes/products.js';
import { authRouter } from '../routes/auth.js';
import { userRouter } from '../routes/user.js';
import { reviewRouter } from '../routes/reviews.js';
import { paymentRouter } from '../routes/payments.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/customers', customerRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/reviews', reviewRouter);
router.use('/payments', paymentRouter);

export default router;