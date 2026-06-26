const express = require("express");

const router = express.Router();

const {
    validateBlockchain,
    getAllBlocks,
    getBlockByNumber
} = require("../controllers/blockchainController");

// Validate Blockchain
router.get("/blockchain/validate", validateBlockchain);

// Get Complete Blockchain
router.get("/blockchain", getAllBlocks);

// Get Single Block
router.get("/blockchain/:blockNumber", getBlockByNumber);

module.exports = router;