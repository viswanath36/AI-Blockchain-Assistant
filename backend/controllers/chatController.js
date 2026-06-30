const askLLM = require("../services/geminiService");
const { getDocumentText } = require("../services/documentStore");
const Document = require("../models/Document");

// Existing RAG using latest uploaded document
const chatWithAI = async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    const documentText = getDocumentText();

    const prompt = `
You are a document assistant.

Answer the user's question using only the information present in the document.

If the information is not available in the document, reply:
"Information not found in the uploaded document."

DOCUMENT:
${documentText}

QUESTION:
${message}
`;

    const reply = await askLLM(prompt);

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// New RAG using a specific document from MongoDB
const chatWithDocument = async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    const prompt = `
You are a document assistant.

Answer the user's question using ONLY the information present in the document.

If the answer is not available in the document, reply:
"Information not found in the uploaded document."

DOCUMENT:
${document.content}

QUESTION:
${message}
`;

    const reply = await askLLM(prompt);

    res.json({
      success: true,
      document: document.filename,
      reply
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
  chatWithAI,
  chatWithDocument
};