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

    const prompt = `Generate a master-level election intelligence report and timeline for ${country}. 
    Return a JSON object with:
    1. "events": Array of 5 major election milestones with id, date, title, description, and status ("completed", "current", or "upcoming").
    2. "stats": An object with:
       - daysUntilPolling: string (e.g. "124 Days")
       - projectedTurnout: string (e.g. "67.4%")
       - activeVoters: string (e.g. "968M")
       - healthScore: number (1-100)
       - cycleInsight: string (A brief analytical insight)

    Return ONLY raw JSON.`;

    const response = await mistralClient.chat.complete({
      model: MISTRAL_MODEL,
      messages: [
        { role: 'system', content: 'You are an election analyst. Return valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      responseFormat: { type: 'json_object' }
    });

    const content = response.choices && response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Failed to generate AI timeline');
    }

    const reportData = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));

    res.status(200).json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    next(error);
  }
};
