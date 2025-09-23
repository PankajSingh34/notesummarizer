import express from "express";
import { Request, Response } from "express";

const router = express.Router();

/**
 * @swagger
 * /api/summarize:
 *   post:
 *     summary: Summarize text content
 *     description: Takes input text and returns an AI-generated summary
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text content to summarize
 *               length:
 *                 type: string
 *                 enum: [short, medium, long]
 *                 description: Desired summary length
 *                 default: medium
 *             required:
 *               - text
 *     responses:
 *       200:
 *         description: Successfully generated summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                   description: The generated summary
 *                 originalWordCount:
 *                   type: number
 *                   description: Word count of original text
 *                 summaryWordCount:
 *                   type: number
 *                   description: Word count of summary
 *                 compressionRatio:
 *                   type: number
 *                   description: Compression ratio (summary/original)
 *       400:
 *         description: Bad request - missing or invalid text
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text, length = "medium" } = req.body;

    // Validation
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        error: "Text content is required and must be a non-empty string"
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        error: "Text content too long. Maximum 50,000 characters allowed."
      });
    }

    // Generate summary using intelligent extraction
    const summary = await generateSummary(text, length);
    
    // Calculate metrics
    const originalWordCount = countWords(text);
    const summaryWordCount = countWords(summary);
    const compressionRatio = Math.round((summaryWordCount / originalWordCount) * 100) / 100;

    res.json({
      summary,
      originalWordCount,
      summaryWordCount,
      compressionRatio,
      metadata: {
        timestamp: new Date().toISOString(),
        length,
        processingTime: Date.now() - req.body._startTime || 0
      }
    });

  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({
      error: "Failed to generate summary. Please try again."
    });
  }
});

// Helper function to generate intelligent summaries
async function generateSummary(text: string, length: string): Promise<string> {
  // Clean and prepare text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Split into sentences
  const sentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10); // Filter out very short sentences

  if (sentences.length === 0) {
    return "Unable to generate summary from the provided text.";
  }

  // Determine target length
  let targetSentences: number;
  switch (length) {
    case "short":
      targetSentences = Math.max(1, Math.ceil(sentences.length * 0.15));
      break;
    case "long":
      targetSentences = Math.max(2, Math.ceil(sentences.length * 0.4));
      break;
    default: // medium
      targetSentences = Math.max(1, Math.ceil(sentences.length * 0.25));
  }

  // Score sentences based on multiple factors
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;

    // Position score (first and last sentences are often important)
    if (index === 0 || index === sentences.length - 1) {
      score += 2;
    }

    // Length score (medium-length sentences often contain key info)
    const wordCount = countWords(sentence);
    if (wordCount >= 8 && wordCount <= 25) {
      score += 1;
    }

    // Keyword presence score
    const keywordIndicators = [
      'important', 'significant', 'key', 'main', 'primary', 'essential',
      'conclusion', 'result', 'therefore', 'however', 'moreover', 'furthermore',
      'in summary', 'to conclude', 'overall', 'ultimately', 'specifically'
    ];
    
    const lowerSentence = sentence.toLowerCase();
    keywordIndicators.forEach(keyword => {
      if (lowerSentence.includes(keyword)) {
        score += 1;
      }
    });

    // Numerical data score (sentences with numbers/percentages are often important)
    if (/\d+/.test(sentence)) {
      score += 0.5;
    }

    return { sentence, score, index };
  });

  // Sort by score and select top sentences
  const selectedSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, targetSentences)
    .sort((a, b) => a.index - b.index) // Restore original order
    .map(item => item.sentence);

  // Join and clean up the summary
  let summary = selectedSentences.join('. ').trim();
  
  // Ensure proper ending
  if (!summary.endsWith('.') && !summary.endsWith('!') && !summary.endsWith('?')) {
    summary += '.';
  }

  return summary;
}

// Helper function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export default router;