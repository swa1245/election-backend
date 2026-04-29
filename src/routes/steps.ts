import { Router } from 'express';
import { getSteps } from '../controllers/stepsController.js';

const router = Router();

router.get('/:country', getSteps);

export default router;
