import * as lark from '@larksuiteoapi/node-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new lark.Client({
  appId: process.env.LARK_APP_ID,
  appSecret: process.env.LARK_APP_SECRET,
  appType: lark.AppType.SelfBuild,
  domain: lark.Domain.Lark,
});

export default client;
