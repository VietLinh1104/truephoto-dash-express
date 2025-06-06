import express from 'express';
import { sendEmail } from '../services/email.service.js';
import { auth, checkPermission } from '../middleware/auth.middleware.js';   

const router = express.Router();

// Public route - anyone can send emails
router.post('/send', 
    auth, checkPermission('send_mail', 'send'),
    async (req, res) => {
        try {
            const { to, subject, text, html } = req.body;

            // Validate required fields
            if (!to || !subject || (!text && !html)) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: to, subject, and either text or html content'
                });
            }

            const result = await sendEmail({ to, subject, text, html });
            res.json({
                success: true,
                message: 'Email sent successfully',
                data: result
            });
        } catch (error) {
            console.error('Error in email route:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send email',
                error: error.message
            });
        }
    }
);

// Protected route - only admin and employee can view email history
router.get('/history',
    
    async (req, res) => {
        // Implement email history logic here
        res.json({
            success: true,
            message: 'Email history retrieved successfully',
            data: [] // Add your email history data here
        });
    }
);

export default router; 