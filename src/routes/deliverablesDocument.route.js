import express from 'express';
import {
  createDeliverablesDocument,
  getAllDeliverablesDocuments,
  getDeliverablesDocumentById,
  updateDeliverablesDocument,
  deleteDeliverablesDocument
} from '../controllers/deliverablesDocument.controller.js';
import { auth, checkPermission } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new deliverables document
router.post('/',
    auth, checkPermission('deliverables_document', 'delete'),
    createDeliverablesDocument);

// Get all deliverables documents
router.get('/',
    auth, checkPermission('deliverables_document', 'delete'),
    getAllDeliverablesDocuments);

// Get a deliverables document by ID
router.get('/:id_deliverables_document',
    auth, checkPermission('deliverables_document', 'delete'),
    getDeliverablesDocumentById);

// Update a deliverables document by ID
router.put('/:id_deliverables_document',
    auth, checkPermission('deliverables_document', 'delete'),
    updateDeliverablesDocument);

// Delete a deliverables document by ID
router.delete('/:id_deliverables_document',
    auth, checkPermission('deliverables_document', 'delete'),
    deleteDeliverablesDocument);

export default router;
