import { Request, Response, NextFunction } from 'express';
import { mistralClient, MISTRAL_MODEL, SYSTEM_PROMPT } from '../config/mistral.js';
import { validateChatMessage } from '../utils/validators.js';
import logger from '../utils/logger.js';

export const handleChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, history } = req.body;

    const validationError = validateChatMessage(message);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    logger.info(`Processing Mistral chat message: ${message.substring(0, 50)}...`);

    // Prepare messages for Mistral
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const chatResponse = await mistralClient.chat.complete({
      model: MISTRAL_MODEL,
      messages: messages as any,
    });

    const reply = chatResponse.choices && chatResponse.choices[0]?.message?.content;

    if (!reply) {
      throw new Error('No response from Mistral AI');
    }

    if (typeof reply === 'string') {
      logger.info(`Mistral AI response: ${reply.substring(0, 50)}...`);
    } else {
      logger.info('Mistral AI response: [Non-string content]');
    }

    res.status(200).json({
      success: true,
      data: {
        role: 'assistant',
        content: reply,
      },
    });
  } catch (error) {
    logger.error('Mistral Chat Error:', error);
    next(error);
  }
};
