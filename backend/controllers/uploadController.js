const crypto = require("crypto");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Document = require("../models/Document");
const { saveDocumentText } = require("../services/documentStore");
const { createBlock } = require("../services/blockchainService");

// Upload PDF and save to MongoDB
const uploadDocument = async (req, res) => {
  try {
    const path = require("path");

    const filePath = path.resolve(req.file.path);

    const dataBuffer = fs.readFileSync(filePath);

    const fileHash = crypto
      .createHash("sha256")
      .update(dataBuffer)
      .digest("hex"); 
    const pdfData = await pdfParse(dataBuffer);

    // Save document text in memory (for RAG)
    saveDocumentText(pdfData.text);

    // Save document in MongoDB
    const savedDocument = await Document.create({
      filename: req.file.originalname,
      filepath: req.file.path,
      content: pdfData.text,
      fileHash,
    });

    // Create a block in the blockchain
    const block = await createBlock(savedDocument._id, fileHash);

    res.json({
      success: true,
      filename: req.file.originalname,

      fileHash,

      blockNumber: block.blockNumber,

      previousHash: block.previousHash,

      blockHash: block.blockHash,

      message: "Document uploaded and blockchain block created successfully",

      text: pdfData.text.substring(0, 1000)
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all uploaded documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .select("filename filepath fileHash uploadedAt");

    res.json({
      success: true,
      count: documents.length,
      documents
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments
};