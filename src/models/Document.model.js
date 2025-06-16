import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import * as larkService from '../services/larkNotify.service.js';
import RequestClient from './RequestClient.model.js';

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
      // Cho phép null cả hai cột nếu cần
    }
  }
});

// ✅ Hook gửi thông báo sau khi tạo document
Document.afterCreate(async (document) => {
  if (!document.id_request_client) return;

  try {
    const requestClient = await RequestClient.findByPk(document.id_request_client);
    if (!requestClient) return;

    const chatId = process.env.LARK_APP_ID_CHAT; // từ .env
    await larkService.sendCard(chatId, '📢 New Document Uploaded', requestClient);

    console.log('✔️ Lark notification sent after document upload');
  } catch (err) {
    console.error('❌ Failed to send Lark notification:', err?.message || err);
  }
});

export default Document;
