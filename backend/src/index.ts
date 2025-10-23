import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Import routes
import summarizeRoutes from "./routes/summarize";
import notesRoutes from "./routes/notes";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect MongoDB (with error handling to continue without DB)
connectDB().catch(err => {
  console.log("⚠️  Continuing without MongoDB connection");
});

// API Routes
app.use("/api/summarize", summarizeRoutes);
app.use("/api/notes", notesRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ 
    message: "NoteSummarizer Backend 🚀", 
    status: "running",
    endpoints: {
      summarize: "/api/summarize",
      upload: "/api/notes/upload",
      validate: "/api/notes/validate",
      health: "/health"
    }
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀Server running at http://localhost:${PORT}`);
});
