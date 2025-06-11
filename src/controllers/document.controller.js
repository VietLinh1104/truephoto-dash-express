import {Document, DeliverablesDocument, RequestClient} from "../models/index.model.js"

export const create = async (req, res) => {
    try {
        const {data} = req.body;

        const document = await Document.create({
            file_name: data.file_name,
            key: data.key,
            bucket_name: data.bucket_name,
            document_url: data.document_url,
            size: data.size,
            mine_type: data.mine_type,
            status_upload: data.status_upload,
            id_request_client: data.id_request_client || null,
            id_deliverables_document: data.id_deliverables_document || null,

        })

        res.status(201).json({data: document});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const readAll = async (req, res) => {
  try {
    // Lấy thông tin phân trang từ query
    const page = parseInt(req.query.pagination?.page) || 1;
    const pageSize = parseInt(req.query.pagination?.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Đếm tổng số bản ghi + lấy dữ liệu theo phân trang
    const { count, rows } = await Document.findAndCountAll({
      include: [
        { model: DeliverablesDocument },
        { model: RequestClient }
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit
    });

    // Nếu không có dữ liệu
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No documents found' });
    }

    // Trả về dữ liệu kèm thông tin phân trang
    res.status(200).json({
      data: rows,
      meta: {
        pagination: {
          total: count,
          page,
          pageSize,
          pageCount: Math.ceil(count / pageSize)
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


export const readById = async (req, res) => {
    try {
        const { id_document } = req.params;
        const document = await Document.findByPk(id_document, {
          include: [
            { model: DeliverablesDocument },
            { model: RequestClient }
          ]
        });

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({data : document});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id_document } = req.params;
        const { file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document } = req.body;

        const document = await Document.findByPk(id_document);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await document.update({
            file_name, key, bucket_name, document_url, size, mine_type, status_upload, id_request_client, id_deliverables_document
        });

        res.status(200).json({data : document});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteById = async (req, res) => {
    try {
        const { id_document } = req.params;
        const document = await Document.findByPk(id_document);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await document.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

