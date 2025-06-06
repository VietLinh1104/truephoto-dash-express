import {Document, DeliverablesDocument, RequestClient} from "../models/index.model.js"

export const create = async (req, res) => {
    try {
        const {file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document} = req.body;

        const document = await Document.create({
            file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document
        })

        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const readAll = async (req, res) => {
    try {
        const documents = await Document.findAll({
            include: [
                { model: DeliverablesDocument },
                { model: RequestClient }
            ],
            order: [['created_at', 'DESC']]
        });

        // Check if documents exist
        if (documents.length === 0) {
            return res.status(404).json({ error: 'No documents found' });
        }

        res.status(201).json(documents);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const readById = async (req, res) => {
    try {
        const { id_document } = req.params;
        const document = await Document.findByPk(id_document, {
          include: [
            { model: DeliverablesDocument },
            { model: RequestClient }
          ]
        });

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id_document } = req.params;
        const { file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document } = req.body;

        const document = await Document.findByPk(id_document);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await document.update({
            file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document
        });

        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteById = async (req, res) => {
    try {
        const { id_document } = req.params;
        const document = await Document.findByPk(id_document);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await document.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

