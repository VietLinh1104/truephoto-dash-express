import express from 'express';
import sequelize from './config/database.config.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import clientEmailSubmissionRoutes from './routes/clientEmailSubmission.route.js';
import emailRoutes from './routes/email.route.js';
import documentRoutes from './routes/document.route.js';
import requestClientRoutes from './routes/requestClient.route.js';
import deliverablesDocumentRoutes from './routes/deliverablesDocument.route.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/email-submissions', clientEmailSubmissionRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/request-clients', requestClientRoutes);
app.use('/api/deliverables-documents', deliverablesDocumentRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');
    await sequelize.sync();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
    );
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
})();
