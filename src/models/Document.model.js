import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

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

export default Document;
