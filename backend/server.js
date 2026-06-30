const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const chatRoutes = require("./routes/chatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const documentRoutes = require("./routes/documentRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const blockchainRoutes = require("./routes/blockchainRoutes");

const app = express();

const dashboardRoutes = require("./routes/dashboardRoutes");

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded PDF files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api", dashboardRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});