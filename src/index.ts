import express, { Express } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

// Route imports
import chatRoutes from './routes/chat.js';
import timelineRoutes from './routes/timeline.js';
import stepsRoutes from './routes/steps.js';
import healthRoutes from './routes/health.js';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/steps', stepsRoutes);
app.use('/health', healthRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Election Assistant Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
