
import {Document, RequestClient, User} from "../models/index.model.js";

export const createRequestClient = async (req, res) => {
  try {
    const { fullname, email, phone_number, address, processing_request_details, request_status, id_user } = req.body;

    const requestClient = await RequestClient.create({
      fullname,
      email,
      phone_number,
      address,
      processing_request_details,
      request_status,
      id_user
    });

    res.status(201).json(requestClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllRequestClients = async (req, res) => {
  try {
    const requestClients = await RequestClient.findAll({
        order: [['created_at', 'DESC']],
        include: [
            { model: Document },
            { model: User}
        ]
    });

    res.status(200).json(requestClients);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
                { model: User}
            ],
            order: [['created_at', 'DESC']]
        }
    );

    if (!requestClient) {
      return res.status(404).json({ error: 'Request client not found' });
    }

    res.status(200).json(requestClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRequestClient = async (req, res) => {
  try {
    const { id_request_client } = req.params;
    const { fullname, email, phone_number, address, processing_request_details, request_status, id_user } = req.body;

    const requestClient = await RequestClient.findByPk(id_request_client);

    if (!requestClient) {
      return res.status(404).json({ error: 'Request client not found' });
    }

    await requestClient.update({
        fullname,
        email,
        phone_number,
        address,
        processing_request_details,
        request_status,
        id_user
    });

    res.status(200).json(requestClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRequestClient = async (req, res) => {
  try {
    const { id_request_client } = req.params;
    const requestClient = await RequestClient.findByPk(id_request_client);

    if (!requestClient) {
      return res.status(404).json({ error: 'Request client not found' });
    }

    await requestClient.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
