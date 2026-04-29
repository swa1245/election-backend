import { Request, Response, NextFunction } from 'express';
import { mistralClient, MISTRAL_MODEL } from '../config/mistral.js';
import logger from '../utils/logger.js';

export const getSteps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = req.params.country as string;
    logger.info(`Generating AI voting steps for: ${country}`);

    const prompt = `Generate a master-level, comprehensive voting guide for ${country}. 
    Return a JSON array of 5 highly detailed objects with these keys:
    - id: string (unique)
    - title: string (e.g., "Step 1: Voter Enrollment")
    - description: string (concise summary)
    - icon: string (registration, location, vote, check, ballot)
    - details: array of strings (4-5 specific sub-steps)
    - requiredDocs: array of strings (specific IDs or forms)
    - estimatedTime: string
    - proTips: array of strings (2-3 expert tips for a smooth experience)
    - pitfalls: array of strings (common mistakes to avoid)
    - legalNotice: string (one brief legal reminder specific to this step)
    
    Return ONLY the raw JSON array.`;

    const response = await mistralClient.chat.complete({
      model: MISTRAL_MODEL,
      messages: [
        { role: 'system', content: 'You are a professional election guide provider. You always return valid JSON array.' },
        { role: 'user', content: prompt }
      ],
      responseFormat: { type: 'json_object' }
    });

    const content = response.choices && response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Failed to generate AI voting steps');
    }

    let stepsData;
    try {
      const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
      stepsData = Array.isArray(parsed) ? parsed : (parsed.steps || parsed.items || Object.values(parsed)[0]);
    } catch (e) {
      logger.error('Failed to parse AI steps JSON');
      throw new Error('Invalid data format from AI');
    }

    res.status(200).json({
      success: true,
      data: stepsData,
    });
  } catch (error) {
    next(error);
  }
};
