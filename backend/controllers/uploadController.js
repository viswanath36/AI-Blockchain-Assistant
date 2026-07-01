const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");
const { saveDocumentText } = require("../services/documentStore");
const { createBlock } = require("../services/blockchainService");

// Upload PDF and save to MongoDB
const uploadDocument = async (req, res) => {
  console.log("========== Upload Started ==========");

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    console.log("Uploaded File:");
    console.log(req.file);

    const uploadsDir = path.join(__dirname, "..", "uploads");

    // Create uploads folder if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.resolve(req.file.path);

    console.log("Resolved File Path:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(500).json({
        success: false,
        error: "Uploaded file not found on server.",
      });
    }

    const dataBuffer = fs.readFileSync(filePath);

    const fileHash = crypto
      .createHash("sha256")
      .update(dataBuffer)
      .digest("hex");

    const pdfData = await pdfParse(dataBuffer);

    // Save document text (RAG)
    saveDocumentText(pdfData.text);

    // Save in MongoDB
    const savedDocument = await Document.create({
      filename: req.file.originalname,
      filepath: req.file.filename,
      content: pdfData.text,
      fileHash,
    });

    console.log("MongoDB Document Saved:", savedDocument._id);

    // Blockchain
    const block = await createBlock(savedDocument._id, fileHash);

    console.log("Blockchain Block Created:", block.blockNumber);

    res.json({
      success: true,
      filename: req.file.originalname,
      fileHash,
      blockNumber: block.blockNumber,
      previousHash: block.previousHash,
      blockHash: block.blockHash,
      message: "Document uploaded and blockchain block created successfully",
      text: pdfData.text.substring(0, 1000),
    });
  } catch (error) {
    console.error("UPLOAD ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all uploaded documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .select("filename filepath fileHash uploadedAt")
      .sort({ uploadedAt: -1 });

    res.json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
};