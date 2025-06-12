import express from 'express';
import {
  createRequestClient,
  getAllRequestClients,
  getRequestClientById,
  updateRequestClient,
  deleteRequestClient
} from '../controllers/requestClient.controller.js';
import { auth, checkPermission } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new request client
router.post('/',  createRequestClient);

// Get all request clients
router.get('/', auth, checkPermission('request_client', 'read_all'), getAllRequestClients);

// Get a request client by ID
router.get('/:id_request_client', auth, checkPermission('request_client', 'read'), getRequestClientById);

// Update a request client by ID
router.put('/:id_request_client', auth, checkPermission('request_client', 'update'), updateRequestClient);

// Delete a request client by ID
router.delete('/:id_request_client', auth, checkPermission('request_client', 'delete'), deleteRequestClient);

export default router;
