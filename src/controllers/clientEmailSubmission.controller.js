import { ClientEmailSubmission, User } from '../models/index.model.js';

// Create new email submission
export const createEmailSubmission = async (req, res) => {
  try {
    const { client_email, order_status, id_user } = req.body;

    const emailSubmission = await ClientEmailSubmission.create({
      client_email,
      order_status: order_status || 'Pending',
      id_user
    });

    res.status(201).json(emailSubmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all email submissions
export const getAllEmailSubmissions = async (req, res) => {
  try {
    const emailSubmissions = await ClientEmailSubmission.findAll({
      include: [{
        model: User,
      }],
      order: [['created_at', 'DESC']]
    });
    res.json(emailSubmissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get email submission by ID
export const getEmailSubmissionById = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission, {
      include: [{
        model: User,
        attributes: ['username', 'email']
      }]
    });

    if (!emailSubmission) {
      return res.status(404).json({ error: 'Email submission not found' });
    }

    res.json(emailSubmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update email submission
export const updateEmailSubmission = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const { id_user, order_status } = req.body;

    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission);
    if (!emailSubmission) {
      return res.status(404).json({ error: 'Email submission not found' });
    }

    // Update fields
    if (id_user) emailSubmission.id_user = id_user;
    if (order_status) emailSubmission.order_status = order_status;

    await emailSubmission.save();
    res.json(emailSubmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete email submission
export const deleteEmailSubmission = async (req, res) => {
  try {
    const { id_client_email_submission } = req.params;
    const emailSubmission = await ClientEmailSubmission.findByPk(id_client_email_submission);

    if (!emailSubmission) {
      return res.status(404).json({ error: 'Email submission not found' });
    }

    // Check if user is admin or the owner of the submission
    if (req.user.role !== 'admin' || req.user.role !== 'employee') {
      return res.status(403).json({ error: 'Not authorized to delete this submission' });
    }

    await emailSubmission.destroy();
    res.json({ message: 'Email submission deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get email submissions by user
export const getEmailSubmissionsByUser = async (req, res) => {
  try {
    const emailSubmissions = await ClientEmailSubmission.findAll({
      where: { id_user: req.user.id_user },
      order: [['created_at', 'DESC']]
    });
    res.json(emailSubmissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 