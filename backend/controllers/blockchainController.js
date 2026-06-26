const crypto = require("crypto");
const Block = require("../models/Block");

// =============================================
// Validate Blockchain
// =============================================
const validateBlockchain = async (req, res) => {
    try {

        const blocks = await Block.find().sort({ blockNumber: 1 });

        if (blocks.length === 0) {
            return res.json({
                success: true,
                valid: true,
                message: "Blockchain is empty."
            });
        }

        // Validate every block
        for (let i = 0; i < blocks.length; i++) {

            const current = blocks[i];

            // Recalculate current block hash
            const calculatedHash = crypto
                .createHash("sha256")
                .update(
                    current.blockNumber +
                    current.documentId.toString() +
                    current.fileHash +
                    current.previousHash
                )
                .digest("hex");

            // Check if current block hash has been modified
            if (current.blockHash !== calculatedHash) {

                return res.json({
                    success: true,
                    valid: false,
                    block: current.blockNumber,
                    message: "Block hash has been modified."
                });

            }

            // Skip Genesis Block
            if (i === 0) {
                continue;
            }

            const previous = blocks[i - 1];

            // Check blockchain links
            if (current.previousHash !== previous.blockHash) {

                return res.json({
                    success: true,
                    valid: false,
                    block: current.blockNumber,
                    message: "Blockchain has been tampered."
                });

            }

        }

        res.json({
            success: true,
            valid: true,
            blocks: blocks.length,
            message: "Blockchain is valid."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

// =============================================
// Get All Blocks
// =============================================
const getAllBlocks = async (req, res) => {

    try {

        const blocks = await Block.find()
            .sort({ blockNumber: 1 });

        res.json({
            success: true,
            totalBlocks: blocks.length,
            blockchain: blocks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

// =============================================
// Get Single Block
// =============================================
const getBlockByNumber = async (req, res) => {

    try {

        const blockNumber = parseInt(req.params.blockNumber);

        const block = await Block.findOne({
            blockNumber
        });

        if (!block) {

            return res.status(404).json({
                success: false,
                message: "Block not found."
            });

        }

        res.json({
            success: true,
            block
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

// =============================================
// Export Functions
// =============================================
module.exports = {
    validateBlockchain,
    getAllBlocks,
    getBlockByNumber
};