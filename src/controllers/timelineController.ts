import { Request, Response, NextFunction } from 'express';
import { mistralClient, MISTRAL_MODEL } from '../config/mistral.js';
import logger from '../utils/logger.js';

export const getTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = req.params.country as string;
    logger.info(`Generating AI timeline for: ${country}`);

    const prompt = `Generate a chronological timeline of the 4 most important upcoming or very recent election milestones for ${country}. 
    Return the response as a JSON array of objects with the following keys:
    - id: string (unique number)
    - date: string (e.g., "Oct 2026" or "Nov 5, 2026")
    - title: string (short, crisp event title)
    - description: string (one clear sentence about what happens)
    - status: "completed" | "current" | "upcoming"
    
    Return ONLY the raw JSON array. No extra text or markdown code blocks.`;

    const response = await mistralClient.chat.complete({
      model: MISTRAL_MODEL,
      messages: [
        { role: 'system', content: 'You are a professional election data provider. You always return valid JSON array.' },
        { role: 'user', content: prompt }
      ],
      responseFormat: { type: 'json_object' }
    });

    const content = response.choices && response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Failed to generate AI timeline');
    }

    let timelineData;
    try {
      const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
      // Handle the case where Mistral wraps the array in an object
      timelineData = Array.isArray(parsed) ? parsed : (parsed.timeline || parsed.events || Object.values(parsed)[0]);
    } catch (e) {
      logger.error('Failed to parse AI timeline JSON');
      throw new Error('Invalid data format from AI');
    }

    res.status(200).json({
      success: true,
      data: timelineData,
    });
  } catch (error) {
    next(error);
  }
};
