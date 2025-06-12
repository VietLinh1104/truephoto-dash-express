import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
// import * as larkService from '../services/larkNotify.service.js';

const RequestClient = sequelize.define(
  'RequestClient',
  {
    id_request_client: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    id_user: { type: DataTypes.UUID, allowNull: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    processing_request_details: DataTypes.STRING,
    request_status: {
      type: DataTypes.ENUM('Pending', 'Processing', 'Processed'),
      defaultValue: 'Pending',
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: 'RequestClients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// // Thêm hook sau khi tạo record thành công
// RequestClient.afterCreate(async (instance) => {
//   console.log('🔥 afterCreate hook fired:', instance.id_request_client);

//   const chatId = "oc_a677e7241c5f7348c6888f8b70afb351";
//   const text = `🆕 New request:
// • Name: http://localhost:3000/service/client-requests/${instance.id_request_client}
// • Name: ${instance.fullname}
// • Email: ${instance.email}
// • Phone: ${instance.phone_number}
// • Status: ${instance.request_status}`;

//   try {
//     await larkService.sendText(chatId, text);
//     console.log('✔️ Lark notification sent');
//   } catch (err) {
//     console.error('❌ Lark send failed:', err);
//   }
// });

export default RequestClient;
