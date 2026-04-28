import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import loanRoutes from "./routes/loan.js";
import uploadRoutes from "./routes/upload.js";
import setupRoutes from "./routes/setup.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/loan", loanRoutes);
app.use("/upload", uploadRoutes);
app.use("/setup-database", setupRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Loan Forgiveness Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
