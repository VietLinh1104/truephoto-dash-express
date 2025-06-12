// middleware/larkEvent.middleware.js
import pkg from '@larksuiteoapi/node-sdk';
const { EventDispatcher, adaptExpress } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const dispatcher = new EventDispatcher({
  encryptKey: process.env.LARK_ENCRYPT_KEY,
  verificationToken: process.env.LARK_VERIFICATION_TOKEN,
}).register({
  'im.message.receive_v1': async (data) => {
    const chatId = data.message.chat_id;
    // ... gửi trả lời nếu cần
    return { status: 'ok' };
  }
});

export const larkEventMiddleware = adaptExpress(dispatcher, {
  autoChallenge: true
});
