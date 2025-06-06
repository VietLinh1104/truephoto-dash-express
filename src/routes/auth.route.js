import express from 'express';
import { auth , checkPermission} from '../middleware/auth.middleware.js';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, checkPermission('request_client', 'create'), getCurrentUser);
router.put('/profile', auth, checkPermission('request_client', 'create'), updateProfile);
router.put('/change-password', auth, changePassword);

export default router; 