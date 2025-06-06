import {Document, User} from "../models/index.model.js";

export const createDeliverablesDocument = async (req, res) => {
  try {
    const { id_user, file_description, customer_name, client_email } = req.body;

    const deliverablesDocument = await DeliverablesDocument.create({
      id_user,
      file_description,
      customer_name,
      client_email
    });

    res.status(201).json(deliverablesDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDeliverablesDocuments = async (req, res) => {
  try {
    const deliverablesDocuments = await DeliverablesDocument.findAll({
        include: [
            { model: User },
            { model: Document }
        ],
        order: [['created_at', 'DESC']]
    });

    res.status(200).json(deliverablesDocuments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDeliverablesDocumentById = async (req, res) => {
  try {
    const { id_deliverables_document } = req.params;
    const deliverablesDocument = await DeliverablesDocument.findByPk(
        id_deliverables_document,
        {
            include: [
                { model: User },
                { model: Document }
            ]
        }
    );

    if (!deliverablesDocument) {
      return res.status(404).json({ error: 'Deliverables document not found' });
    }

    res.status(200).json(deliverablesDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDeliverablesDocument = async (req, res) => {
  try {
    const { id_deliverables_document } = req.params;
    const { file_description, customer_name, client_email,id_user } = req.body;

    const deliverablesDocument = await DeliverablesDocument.findByPk(id_deliverables_document);

    if (!deliverablesDocument) {
      return res.status(404).json({ error: 'Deliverables document not found' });
    }

    await deliverablesDocument.update({
      file_description,
      customer_name,
      client_email,
      id_user
    });

    res.status(200).json(deliverablesDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDeliverablesDocument = async (req, res) => {
  try {
    const { id_deliverables_document } = req.params;
    const deliverablesDocument = await DeliverablesDocument.findByPk(id_deliverables_document);

    if (!deliverablesDocument) {
      return res.status(404).json({ error: 'Deliverables document not found' });
    }

    await deliverablesDocument.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
