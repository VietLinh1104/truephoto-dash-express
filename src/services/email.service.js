import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create Zoho SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
    }
});

// Verify transporter connection
transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ Email service error:', error);
    } else {
        console.log('✅ Email service is ready to send messages');
    }
});

export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: `"${process.env.ZOHO_NAME}" <${process.env.ZOHO_USER}>`,
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};

export default {
    sendEmail
}; 