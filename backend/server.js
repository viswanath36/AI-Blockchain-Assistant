const express = require("express");
const cors = require("cors");
require("dotenv").config();
const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const connectDB = require("./config/db");
const app = express();
const verifyRoutes = require("./routes/verifyRoutes");
const blockchainRoutes = require("./routes/blockchainRoutes");

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("AI Blockchain Assistant Backend Running");
});

// API Routes
app.use("/api", chatRoutes);
app.use("/api", uploadRoutes);

app.use("/api", blockchainRoutes);

app.use("/api", documentRoutes);
app.use("/api", verifyRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});