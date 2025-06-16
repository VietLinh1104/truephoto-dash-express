import client from '../config/lark.config.js';

export async function sendText(chatId, text) {
  try {
    const res = await client.im.message.create({
      params: { receive_id_type: 'chat_id' },
      data: {
        receive_id: chatId,
        content: JSON.stringify({ text }),
        msg_type: 'text',
      },
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error sending text to Lark:', err?.response?.data || err.message);
    throw err;
  }
}

export async function sendCard(chatId, title, requestClient) {
  const card = {
    config: { wide_screen_mode: true },
    header: {
      title: { tag: 'plain_text', content: title },
    },
    elements: [
      {
        tag: 'markdown',
        content: `📄 **New Document Uploaded**\n\n` +
                 `👤 **Name**: ${requestClient.fullname}\n` +
                 `📧 **Email**: ${requestClient.email}\n` +
                 `📱 **Phone**: ${requestClient.phone_number}\n` +
                 `📌 **Status**: ${requestClient.request_status}`
      },
      {
        tag: 'action',
        actions: [
          {
            tag: 'button',
            text: { tag: 'plain_text', content: '🔗 View Request' },
            url: `${process.env.FRONTEND_URL}/service/client-requests/${requestClient.id_request_client}`,
            type: 'primary'
          }
        ]
      }
    ]
  };

  try {
    await client.im.message.create({
      params: { receive_id_type: 'chat_id' },
      data: {
        receive_id: chatId,
        content: JSON.stringify(card),
        msg_type: 'interactive',
      },
    });
  } catch (err) {
    console.error('❌ Error sending card to Lark:', err?.response?.data || err.message);
    throw err;
  }
}
