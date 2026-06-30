const Document = require("../models/Document");
const Block = require("../models/Block");

const getDashboardStats = async (req, res) => {
  try {
    const totalDocuments = await Document.countDocuments();
    const totalBlocks = await Block.countDocuments();

    res.json({
      success: true,
      totalDocuments,
      totalBlocks,
      verifiedDocuments: totalDocuments,
      totalAIChats: 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};