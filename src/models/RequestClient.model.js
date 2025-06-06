import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const RequestClient = sequelize.define('RequestClient', {
  id_request_client: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  id_user: {
    type: DataTypes.UUID,
    allowNull: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: DataTypes.STRING,
  processing_request_details: DataTypes.STRING,
  request_status: {
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
  tableName: 'RequestClients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default RequestClient;
