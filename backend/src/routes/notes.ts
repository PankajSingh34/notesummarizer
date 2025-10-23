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

// POST /api/notes/upload - Upload and read note files
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

// POST /api/notes/validate - Validate text content
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