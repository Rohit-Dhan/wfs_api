const Document = require('../models/Document');
const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

exports.uploadDocument = async (req, res) => {
  try {
    const { employee_id, doc_type } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    const employee = await Employee.findByPk(employee_id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });

    const file_url = `/uploads/documents/${req.file.filename}`;

    const document = await Document.create({ employee_id, doc_type, file_url });

    res.status(201).json({ message: 'Document uploaded.', document });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocumentsByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const documents = await Document.findAll({ where: { employee_id } });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { doc_type } = req.body;

    const document = await Document.findByPk(id);
    if (!document) return res.status(404).json({ message: 'Document not found.' });

    // Delete old file if new file is uploaded
    if (req.file) {
      const oldPath = path.join(__dirname, '../public', document.file_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      document.file_url = `/uploads/documents/${req.file.filename}`;
    }

    // Update doc_type if provided
    if (doc_type) {
      document.doc_type = doc_type;
    }

    await document.save();

    res.json({ message: 'Document updated.', document });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
    try {
      const { id } = req.params;
  
      const document = await Document.findByPk(id);
      if (!document) return res.status(404).json({ message: 'Document not found.' });
  
      const filePath = path.join(__dirname, '../public', document.file_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  
      await document.destroy();
  
      res.json({ message: 'Document deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  