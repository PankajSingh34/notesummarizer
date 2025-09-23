import express from "express";
import multer from "multer";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.txt', '.md', '.rtf'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExt) || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only text files (.txt, .md, .rtf) are supported'));
    }
  }
});

/**
 * @swagger
 * /api/notes/upload:
 *   post:
 *     summary: Upload and read note files
 *     description: Upload text files and extract their content for summarization
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Text file to upload (.txt, .md, .rtf)
 *     responses:
 *       200:
 *         description: File uploaded and content extracted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: Extracted text content
 *                 filename:
 *                   type: string
 *                   description: Original filename
 *                 wordCount:
 *                   type: number
 *                   description: Number of words in the content
 *                 fileSize:
 *                   type: number
 *                   description: File size in bytes
 *       400:
 *         description: Bad request - invalid file or file type
 *       500:
 *         description: Internal server error
 */
router.post("/upload", upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Please select a text file to upload."
      });
    }

    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Clean up uploaded file after reading
    fs.unlinkSync(filePath);

    // Validate content
    if (!content.trim()) {
      return res.status(400).json({
        error: "The uploaded file appears to be empty."
      });
    }

    const wordCount = countWords(content);

    res.json({
      content: content.trim(),
      filename: req.file.originalname,
      wordCount,
      fileSize: req.file.size,
      metadata: {
        timestamp: new Date().toISOString(),
        encoding: 'utf-8'
      }
    });

  } catch (error) {
    console.error("File upload error:", error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error instanceof Error && error.message.includes('file type')) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: "Failed to process uploaded file. Please try again."
    });
  }
});

/**
 * @swagger
 * /api/notes/validate:
 *   post:
 *     summary: Validate text content
 *     description: Validate and analyze text content before summarization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Text content to validate
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Content validation results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isValid:
 *                   type: boolean
 *                 wordCount:
 *                   type: number
 *                 characterCount:
 *                   type: number
 *                 estimatedReadingTime:
 *                   type: number
 *                   description: Estimated reading time in minutes
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid content
 */
router.post("/validate", async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({
        error: "Content is required and must be a string"
      });
    }

    const trimmedContent = content.trim();
    const wordCount = countWords(trimmedContent);
    const characterCount = trimmedContent.length;
    const estimatedReadingTime = Math.ceil(wordCount / 200); // Average reading speed

    const suggestions: string[] = [];
    let isValid = true;

    // Validation rules
    if (wordCount < 10) {
      isValid = false;
      suggestions.push("Content is too short. Please provide at least 10 words for meaningful summarization.");
    }

    if (wordCount > 10000) {
      suggestions.push("Content is quite long. Consider breaking it into smaller sections for better summaries.");
    }

    if (characterCount > 50000) {
      isValid = false;
      suggestions.push("Content exceeds maximum length limit of 50,000 characters.");
    }

    // Check for potential issues
    const sentences = trimmedContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length < 2) {
      suggestions.push("Content appears to be a single sentence. Summaries work better with multiple sentences.");
    }

    res.json({
      isValid,
      wordCount,
      characterCount,
      estimatedReadingTime,
      suggestions,
      metadata: {
        sentenceCount: sentences.length,
        avgWordsPerSentence: Math.round(wordCount / sentences.length) || 0
      }
    });

  } catch (error) {
    console.error("Content validation error:", error);
    res.status(500).json({
      error: "Failed to validate content. Please try again."
    });
  }
});

// Helper function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export default router;