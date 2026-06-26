const fs = require("fs");
const crypto = require("crypto");
const Document = require("../models/Document");

const verifyDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const newHash = crypto
      .createHash("sha256")
      .update(dataBuffer)
      .digest("hex");

    const verified = newHash === document.fileHash;

    res.json({
      success: true,
      filename: document.filename,
      storedHash: document.fileHash,
      uploadedHash: newHash,
      verified
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { verifyDocument };