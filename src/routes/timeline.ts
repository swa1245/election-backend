import { Router } from 'express';
import { getTimeline } from '../controllers/timelineController.js';

const router = Router();

router.get('/:country', getTimeline);

export default router;
