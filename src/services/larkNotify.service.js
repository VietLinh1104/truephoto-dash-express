// services/larkNotify.service.js
import client from '../config/lark.config.js';
import * as lark from '@larksuiteoapi/node-sdk';

export async function sendText(chatId, text) {
  const res = await client.im.message.create({
    params: { receive_id_type: 'chat_id' },
    data: {
      receive_id: chatId,
      content: JSON.stringify({ text }),
      msg_type: 'text',
    },
  });
  return res.data;
}

export async function sendCard(chatId, title, content) {
  const card = lark.messageCard.defaultCard({ title, content });
  await client.im.message.create({
    params: { receive_id_type: 'chat_id' },
    data: { receive_id: chatId, content: card, msg_type: 'interactive' },
  });
}
