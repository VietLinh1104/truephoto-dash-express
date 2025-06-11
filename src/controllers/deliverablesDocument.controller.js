import { Document, User, DeliverablesDocument } from "../models/index.model.js";

export const createDeliverablesDocument = async (req, res) => {
  try {
    const { id_user, file_description, customer_name, client_email } = req.body.data || req.body;

    const deliverablesDocument = await DeliverablesDocument.create({
      id_user,
      file_description,
      customer_name,
      client_email,
    });

    res.status(201).json({ data: deliverablesDocument });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const getAllDeliverablesDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.pagination?.page) || 1;
    const pageSize = parseInt(req.query.pagination?.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await DeliverablesDocument.findAndCountAll({
      include: [
        { model: User },
        { model: Document },
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (rows.length === 0) {
      return res.status(404).json({ error: { message: 'No deliverables documents found' } });
    }

    res.status(200).json({
      data: rows,
      meta: {
        pagination: {
          total: count,
          page,
          pageSize,
          pageCount: Math.ceil(count / pageSize),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: { message: error.message } });
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
          { model: Document },
        ],
      }
    );

    if (!deliverablesDocument) {
      return res.status(404).json({ error: { message: 'Deliverables document not found' } });
    }

    res.status(200).json({ data: deliverablesDocument });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const updateDeliverablesDocument = async (req, res) => {
  try {
    const { id_deliverables_document } = req.params;
    const { data } = req.body;

    const deliverablesDocument = await DeliverablesDocument.findByPk(id_deliverables_document);

    if (!deliverablesDocument) {
      return res.status(404).json({ error: { message: 'Deliverables document not found' } });
    }

    await deliverablesDocument.update({
      file_description: data.file_description || null,
      customer_name: data.customer_name || null,
      client_email: data.client_email || null,
      id_user: data.id_user || null,
    });

    res.status(200).json({ data: deliverablesDocument });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const deleteDeliverablesDocument = async (req, res) => {
  try {
    const { id_deliverables_document } = req.params;
    const deliverablesDocument = await DeliverablesDocument.findByPk(id_deliverables_document);

    if (!deliverablesDocument) {
      return res.status(404).json({ error: { message: 'Deliverables document not found' } });
    }

    await deliverablesDocument.destroy();
    res.status(200).json({ data: null, message: 'Deliverables document deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};