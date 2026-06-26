const Document = require("../models/Document");

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 });

    res.json({
      success: true,
      totalDocuments: documents.length,
      documents
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    res.json({
      success: true,
      document
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById
};