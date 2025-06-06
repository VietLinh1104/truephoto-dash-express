import User from './User.model.js';
import Comment from './Comment.model.js';
import Document from './Document.model.js';
import DeliverablesDocument from './DeliverablesDocument.model.js';
import ClientEmailSubmission from './ClientEmailSubmission.model.js';
import RequestClient from './RequestClient.model.js';

User.hasMany(ClientEmailSubmission, { foreignKey: 'id_user' });
ClientEmailSubmission.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Comment, { foreignKey: 'id_user' });
Comment.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(DeliverablesDocument, { foreignKey: 'id_user' });
DeliverablesDocument.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(RequestClient, { foreignKey: 'id_user' });
RequestClient.belongsTo(User, { foreignKey: 'id_user' });

DeliverablesDocument.hasMany(Document, { foreignKey: 'id_deliverables_document' });
Document.belongsTo(DeliverablesDocument, { foreignKey: 'id_deliverables_document' });

RequestClient.hasMany(Document, { foreignKey: 'id_request_client' });
Document.belongsTo(RequestClient, { foreignKey: 'id_request_client' });

export {
  User,
  Comment,
  Document,
  DeliverablesDocument,
  ClientEmailSubmission,
  RequestClient
};