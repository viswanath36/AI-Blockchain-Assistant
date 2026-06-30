const Document = require("../models/Document");
const path = require("path");
const fs = require("fs");

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .select("filename filepath fileHash uploadedAt")
      .sort({ uploadedAt: -1 });

    res.json({
      success: true,
      totalDocuments: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
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
        error: "Document not found",
      });
    }

    res.json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// View PDF document
const viewDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    const filePath = path.join(__dirname, "..", document.filepath);

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Download document
const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    const filePath = path.join(__dirname, "..", document.filepath);

    // Download using the original filename
    res.download(filePath, document.filename);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    // Delete file from uploads folder
    const filePath = path.join(__dirname, "..", document.filepath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete document from MongoDB
    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  viewDocument,
  downloadDocument,
  deleteDocument,
};