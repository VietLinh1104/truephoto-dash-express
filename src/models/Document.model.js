import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import * as larkService from '../services/larkNotify.service.js';
import RequestClient from './RequestClient.model.js'; // 🔥 Thêm dòng này
import dotenv from 'dotenv';
dotenv.config();

const Document = sequelize.define('Document', {
  id_document: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  id_request_client: {
    type: DataTypes.UUID,
    allowNull: true
  },
  id_deliverables_document: {
    type: DataTypes.UUID,
    allowNull: true
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: DataTypes.STRING,
  bucket_name: DataTypes.STRING,
  document_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  mine_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_upload: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Documents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  validate: {
    checkParent() {
      // Ràng buộc đã được loại bỏ để cho phép cả hai cột null
    }
  }
});

// ✅ Gửi thông báo sau khi Document được upload thành công
Document.afterCreate(async (document) => {
  if (!document.id_request_client) return;

  try {
    const requestClient = await RequestClient.findByPk(document.id_request_client);
    if (!requestClient) return;

    const chatId = process.env.NEXT_PUBLIC_EXPRESS_URL;

    const text = `🆕 New document uploaded for request:\n` +
      `• 🔗 Link: ${MANAGER_URL}/service/client-requests/${requestClient.id_request_client}\n` +
      `• 👤 Name: ${requestClient.fullname}\n` +
      `• 📧 Email: ${requestClient.email}\n` +
      `• 📱 Phone: ${requestClient.phone_number}\n` +
      `• 📌 Status: ${requestClient.request_status}`;

    await larkService.sendText(chatId, text);
    console.log('✔️ Lark notification sent after document upload');
  } catch (err) {
    console.error('❌ Failed to send Lark notification:', err);
  }
});

export default Document;
