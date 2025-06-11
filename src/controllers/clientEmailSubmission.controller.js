import { ClientEmailSubmission, User } from '../models/index.model.js';

// Create new email submission
export const createEmailSubmission = async (req, res) => {
  try {
    const { client_email, order_status, id_user } = req.body.data || req.body; // Hỗ trợ cả { data: ... } và payload trực tiếp

    const emailSubmission = await ClientEmailSubmission.create({
      client_email,
      order_status: order_status || 'Pending',
      id_user,
    });

    res.status(201).json({ data: emailSubmission });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

// Get all email submissions
export const getAllEmailSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.pagination?.page) || 1;
    const pageSize = parseInt(req.query.pagination?.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await ClientEmailSubmission.findAndCountAll({
      include: [{ model: User }],
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (rows.length === 0) {
      return res.status(404).json({ error: { message: 'No email submissions found' } });
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

// Get email submission by ID
export const getEmailSubmissionById = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission, {
      include: [{
        model: User,
        attributes: ['username', 'email'],
      }],
    });

    if (!emailSubmission) {
      return res.status(404).json({ error: { message: 'Email submission not found' } });
    }

    res.status(200).json({ data: emailSubmission });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

// Update email submission
export const updateEmailSubmission = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const { data } = req.body;

    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission);
    if (!emailSubmission) {
      return res.status(404).json({ error: { message: 'Email submission not found' } });
    }

    // Update fields
    if (data.id_user) emailSubmission.id_user = data.id_user;
    if (data.order_status) emailSubmission.order_status = data.order_status;

    await emailSubmission.save();
    res.status(200).json({ data: emailSubmission });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

// Delete email submission
export const deleteEmailSubmission = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission);

    if (!emailSubmission) {
      return res.status(404).json({ error: { message: 'Email submission not found' } });
    }

    // Check if user is admin or employee
    if (req.user.role !== 'admin' && req.user.role !== 'employee') {
      return res.status(403).json({ error: { message: 'Not authorized to delete this submission' } });
    }

    await emailSubmission.destroy();
    res.status(200).json({ data: null, message: 'Email submission deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

// Get email submissions by user
export const getEmailSubmissionsByUser = async (req, res) => {
  try {
    const emailSubmissions = await ClientEmailSubmission.findAll({
      where: { id_user: req.user.id_user },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({ data: emailSubmissions });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};