import express from 'express';
import { getUnReadAlerts } from '../controllers/alertController.js';
import { markAsRead } from '../controllers/alertController.js';
import { clearAllAlerts } from '../controllers/alertController.js';

const router = express.Router();
router.get('/my-alerts/:userId', getUnReadAlerts);
router.post('/mark-as-read/:alertId', markAsRead)
router.post('/clear-all', clearAllAlerts)

export default router;
