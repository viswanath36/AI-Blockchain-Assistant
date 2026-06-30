  const express = require("express");
  const router = express.Router();

  const {
  getAllDocuments,
  getDocumentById,
  viewDocument,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documentController");

  router.get("/documents", getAllDocuments);

  router.get("/document/:id", getDocumentById);

  router.get("/document/view/:id", viewDocument);

  router.get("/document/download/:id", downloadDocument);

  router.delete("/document/:id", deleteDocument);

  module.exports = router;