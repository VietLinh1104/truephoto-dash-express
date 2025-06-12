import express from 'express';
import{create, readAll, readById, update, deleteById } from '../controllers/document.controller.js'; 
import { auth, checkPermission } from '../middleware/auth.middleware.js';   

const router = express.Router();

router.post('/', 
    create
);

router.get('/', 
    auth, checkPermission('documents', 'read_all'),
    readAll
);

router.get('/:id_document', 
    auth, checkPermission('documents', 'read'),
    readById
);

router.put('/:id_document', 
    auth, checkPermission('documents', 'update'),
    update
);

router.delete('/:id_document', 
    auth, checkPermission('documents', 'delete'),
    deleteById
);

export default router;