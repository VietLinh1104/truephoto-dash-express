import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const ClientEmailSubmission = sequelize.define('ClientEmailSubmission', {
  id_client_email_submission: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  id_user: {
    type: DataTypes.UUID,
    allowNull: true
  },
  client_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order_status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Processed'),
    defaultValue: 'Pending'
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
  tableName: 'ClientEmailSubmission',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ClientEmailSubmission;
