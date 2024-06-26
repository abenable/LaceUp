import express from 'express';
import {
  AdminRegister,
  CheckAuth,
  Login,
  Register,
  forgotpassword,
  resetpassword,
  updatepassword,
} from '../controllers/auth.js';
import { ApiError } from '../controllers/error.js';

const router = express.Router();

router.post('/register', Register);
router.post('/admin/register', AdminRegister);
router.post('/login', Login);
router.get('/checkauth', CheckAuth);
router.post('/forgotpassword', forgotpassword);
router.post('/updatepassword', updatepassword);
router.patch('/resetpassword', resetpassword);

router.all('*', (req, res, next) => {
  next(
    new ApiError(404, `Oooops!! Can't find ${req.originalUrl} on this server!`)
  );
});

export { router as authRouter };
