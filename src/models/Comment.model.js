import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Comment = sequelize.define('Comment', {
  id_comment: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  id_user: {
    type: DataTypes.UUID,
    allowNull: false
  },
  id_request_client: {
    type: DataTypes.UUID,
    allowNull: true
  },
  id_deliverables_document: {
    type: DataTypes.UUID,
    allowNull: true
  },
  parent_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  content_comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Comment;
