import express from 'express';
import {
  createEmailSubmission,
  getAllEmailSubmissions,
  getEmailSubmissionById,
  updateEmailSubmission,
  deleteEmailSubmission,
} from '../controllers/clientEmailSubmission.controller.js';
import { auth, checkPermission } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create - Only client can create
router.post('/',
    auth, checkPermission('client_email_submission', 'create'),
    createEmailSubmission
);

// Get all - Only admin and employee can read all
router.get('/',
    auth, checkPermission('client_email_submission', 'read_all'),
    getAllEmailSubmissions
);

// Get by ID - Client can read their own, admin/employee can read all
router.get('/:id_client_email_submission',
    auth, checkPermission('client_email_submission', 'read'),
    getEmailSubmissionById
);

// Update - Only client can update their own
router.put('/:id_client_email_submission',
    auth, checkPermission('client_email_submission', 'update'),
    updateEmailSubmission
);

// Delete - Only admin can delete
router.delete('/:id_client_email_submission',
    auth, checkPermission('client_email_submission', 'delete'),
    deleteEmailSubmission
);

export default router; 