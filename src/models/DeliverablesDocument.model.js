import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const DeliverablesDocument = sequelize.define('DeliverablesDocument', {
  id_deliverables_document: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  id_user: {
    type: DataTypes.UUID,
    allowNull: true
  },
  file_description: DataTypes.STRING,
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_email: {
    type: DataTypes.STRING,
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
  tableName: 'DeliverablesDocument',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default DeliverablesDocument;
