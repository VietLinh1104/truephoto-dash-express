import { Document, RequestClient, User } from "../models/index.model.js";
import { sendText } from '../services/larkNotify.service.js'; 

export const createRequestClient = async (req, res) => {
  try {
    const { fullname, email, phone_number, address, processing_request_details, request_status, id_user } = req.body.data || req.body;

    const requestClient = await RequestClient.create({
      fullname,
      email,
      phone_number,
      address,
      processing_request_details,
      request_status,
      id_user,
    });

    // Gửi thông báo tới Lark
    const chatId = process.env.LARK_DEFAULT_CHAT_ID;
    const text = `🆕 New request từ ${fullname}\nEmail: ${email}\nChi tiết: ${processing_request_details}`;
    sendText(chatId, text).catch(console.error);

    res.status(201).json({ data: requestClient });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const getAllRequestClients = async (req, res) => {
  try {
    const page = parseInt(req.query.pagination?.page) || 1;
    const pageSize = parseInt(req.query.pagination?.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await RequestClient.findAndCountAll({
      order: [['created_at', 'DESC']],
      offset,
      limit,
      include: [
        { model: Document },
        { model: User },
      ],
    });

    res.status(200).json({
      data: rows,
      meta: {
        pagination: {
          total: count,
          page,
          pageSize,
          pageCount: Math.ceil(count / pageSize),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: { message: error.message } });
  }
};

export const getRequestClientById = async (req, res) => {
  try {
    const { id_request_client } = req.params;
    const requestClient = await RequestClient.findByPk(
      id_request_client,
      {
        include: [
          { model: Document },
          { model: User },
        ],
        order: [['created_at', 'DESC']],
      }
    );

    if (!requestClient) {
      return res.status(404).json({ error: { message: 'Request client not found' } });
    }

    res.status(200).json({ data: requestClient });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const updateRequestClient = async (req, res) => {
  try {
    const { id_request_client } = req.params;
    const { data } = req.body;

    const requestClient = await RequestClient.findByPk(id_request_client);

    if (!requestClient) {
      return res.status(404).json({ error: { message: 'Request client not found' } });
    }

    await requestClient.update({
      fullname: data.fullname || requestClient.fullname,
      email: data.email || requestClient.email,
      phone_number: data.phone_number || requestClient.phone_number,
      address: data.address || requestClient.address,
      processing_request_details: data.processing_request_details || requestClient.processing_request_details,
      request_status: data.request_status || requestClient.request_status,
      id_user: data.id_user || requestClient.id_user,
    });

    res.status(200).json({ data: requestClient });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

export const deleteRequestClient = async (req, res) => {
  try {
    const { id_request_client } = req.params;
    const requestClient = await RequestClient.findByPk(id_request_client);

    if (!requestClient) {
      return res.status(404).json({ error: { message: 'Request client not found' } });
    }

    await requestClient.destroy();
    res.status(200).json({ data: null, message: 'Request client deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};