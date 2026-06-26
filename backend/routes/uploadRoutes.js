const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");

const {
  uploadDocument,
  getDocuments
} = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

router.get("/documents", getDocuments);

module.exports = router;