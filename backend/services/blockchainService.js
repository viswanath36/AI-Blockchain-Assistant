const crypto = require("crypto");
const Block = require("../models/Block");

const createBlock = async (documentId, fileHash) => {

    // Get the latest block
    const previousBlock = await Block.findOne().sort({ blockNumber: -1 });

    const blockNumber = previousBlock
        ? previousBlock.blockNumber + 1
        : 1;

    const previousHash = previousBlock
        ? previousBlock.blockHash
        : "GENESIS";

    const blockHash = crypto
        .createHash("sha256")
        .update(
            blockNumber +
            documentId.toString() +
            fileHash +
            previousHash
        )
        .digest("hex");

    const block = await Block.create({
        blockNumber,
        documentId,
        fileHash,
        previousHash,
        blockHash
    });

    return block;
};

module.exports = {
    createBlock
};