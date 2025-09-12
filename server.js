import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import dbConfig from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
dbConfig();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
