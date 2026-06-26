const express = require("express");

const router = express.Router();

const {
  chatWithAI,
  chatWithDocument
} = require("../controllers/chatController");

router.post("/chat", chatWithAI);

router.post("/chat/:id", chatWithDocument);

module.exports = router;