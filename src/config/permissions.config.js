// permissions.config.js

const permissions = {
    admin: {
        client_email_submission: ['read', 'read_all', 'create', 'update', 'delete'],
        email: ['send', 'read_all'],
        request_client: ['create', 'read_all', 'read', 'update', 'delete'],
        deliverables_document: ['create', 'read_all', 'read', 'update', 'delete'],
        document: ['read_all', 'read', 'create', 'update', 'delete'],
        send_mail: ['send'],
    },
    employee: {
        client_email_submission: ['read_all', 'read'],
        email: ['send', 'read_all']
    },
    public: {
        client_email_submission: ['read_all'],
        email: ['send'],
        document: ['read_all', 'read', 'create'],
        request_client: ['create', 'read_all', 'read'],
    }
};
  
export default permissions;
  