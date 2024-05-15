import express from 'express';
import { protect, restrictTo } from '../controllers/auth.js';
import { ApiError } from '../controllers/error.js';
import logger from '../utils/logger.js';
import {
  allUsers,
  delUser,
  searchUser,
  userProfile,
} from '../controllers/user.js';

const router = express.Router();

router.delete(
  '/delete/:userId',
  protect,
  restrictTo('admin'),
  (req, res, next) => {
    logger.info('Delete user request received');
    delUser(req, res, next);
  }
);

router.get('/search', protect, restrictTo('admin'), (req, res, next) => {
  logger.info('Search user request received');
  searchUser(req, res, next);
});

router.get('', protect, restrictTo('admin'), (req, res, next) => {
  logger.info('Get all users request received');
  allUsers(req, res, next);
});

router.get('/profile/:id', protect, (req, res, next) => {
  logger.info('Get user profile request received');
  userProfile(req, res, next);
});

router.all('*', (req, res, next) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  next(
    new ApiError(404, `Oooops!! Can't find ${req.originalUrl} on this server!`)
  );
});

export { router as userRouter };
