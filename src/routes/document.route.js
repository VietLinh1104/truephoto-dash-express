import express from 'express';
import{create, readAll, readById, update, deleteById } from '../controllers/document.controller.js'; 
import { auth, checkPermission } from '../middleware/auth.middleware.js';   

const router = express.Router();

router.post('/', 
    auth, checkPermission('document', 'create'),
    create
);

router.get('/', 
    auth, checkPermission('document', 'read_all'),
    readAll
);

router.get('/:id_document', 
    auth, checkPermission('document', 'read'),
    readById
);

router.put('/:id_document', 
    auth, checkPermission('document', 'update'),
    update
);

router.delete('/:id_document', 
    auth, checkPermission('document', 'delete'),
    deleteById
);

export default router;