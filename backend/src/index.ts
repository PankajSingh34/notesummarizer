import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Import routes
import summarizeRoutes from "./routes/summarize";
import notesRoutes from "./routes/notes";

dotenv.config(); // Load .env variables


// Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "NoteSummarizer API",
      version: "1.0.0",
      description: "API documentation for NoteSummarizer backend",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 8000}` }
    ],
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"], // path to API docs in TypeScript files
};
const swaggerSpec = swaggerJsdoc(options);

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

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API information
 *     description: Returns basic information about the NoteSummarizer API
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 endpoints:
 *                   type: object
 */
// Test Route
app.get("/", (req, res) => {
  res.json({ 
    message: "NoteSummarizer Backend 🚀", 
    status: "running",
    endpoints: {
      swagger: "/api-docs",
      health: "/health"
    }
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API
 *     responses:
 *       200:
 *         description: Health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 uptime:
 *                   type: number
 */
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
