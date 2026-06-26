const express = require("express");
const router = express.Router();

const {
  getAllDocuments,
  getDocumentById
} = require("../controllers/documentController");

router.get("/documents", getAllDocuments);

router.get("/document/:id", getDocumentById);

module.exports = router;