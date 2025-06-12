import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.config.js';
import { larkEventMiddleware } from './middleware/larkEvent.middleware.js';


// Import routes
import authRoutes from './routes/auth.route.js';
import clientEmailSubmissionRoutes from './routes/clientEmailSubmission.route.js';
import emailRoutes from './routes/email.route.js';
import documentRoutes from './routes/document.route.js';
import requestClientRoutes from './routes/requestClient.route.js';
import deliverablesDocumentRoutes from './routes/deliverablesDocument.route.js';
import larkRoute from './routes/lark.route.js';




// Load env variables
dotenv.config();

const app = express();
app.use(express.json());

// CORS cấu hình đầy đủ
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:3001'], // Cho phép frontend truy cập
  credentials: true,               // Cho phép gửi cookie / Authorization header
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));            // Áp dụng CORS cho mọi request
app.options('*', cors(corsOptions));   // Xử lý preflight request

// Middleware log thời gian, endpoint, và status
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  res.on('finish', () => {
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/email-submissions', clientEmailSubmissionRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/request-clients', requestClientRoutes);
app.use('/api/deliverables-documents', deliverablesDocumentRoutes);
app.use('/api/lark', larkRoute);
app.use('/webhook/lark', larkEventMiddleware);

// Kết nối DB và chạy server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    await sequelize.sync(); // Tùy chọn: bạn có thể dùng { alter: true } hoặc { force: true } khi cần

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
})();
