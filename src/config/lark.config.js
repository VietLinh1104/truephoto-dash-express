import * as lark from '@larksuiteoapi/node-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new lark.Client({
  appId: process.env.LARK_APP_ID,
  appSecret: process.env.LARK_APP_SECRET,
  appType: lark.AppType.SelfBuild, // hoặc AppType.ISV nếu bạn dùng app ISV
  domain: lark.Domain.Lark,        // hoặc Domain.Feishu
});

export default client;
