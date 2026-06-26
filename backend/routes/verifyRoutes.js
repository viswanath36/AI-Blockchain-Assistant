const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");

const {
  verifyDocument
} = require("../controllers/verifyController");

router.post(
  "/verify/:id",
  upload.single("document"),
  verifyDocument
);

module.exports = router;