import jwt from 'jsonwebtoken';
import { User } from '../models/index.model.js';
import permissions from '../config/permissions.config.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token && permissions.public) {
      req.user = { role: 'public' }; // Gán vai trò public nếu không có token
      return next();
    }

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id_user: decoded.id_user } });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

const checkPermission = (resource, action) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const allowedActions = permissions[userRole]?.[resource] || [];

    if (!allowedActions.includes(action)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

export { auth, checkRole, checkPermission };