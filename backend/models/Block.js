const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({

  blockNumber: {
    type: Number,
    required: true
  },

  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },

  fileHash: {
    type: String,
    required: true
  },

  previousHash: {
    type: String,
    required: true
  },

  blockHash: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Block", blockSchema);