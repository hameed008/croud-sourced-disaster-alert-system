import express from 'express';
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport
} from '../controllers/reportController.js';
import upload from '../middlewares/upload.js';

import passport from 'passport';

//import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), upload.array('images', 10), createReport);  // Create report (authenticated)
router.get('/', getReports);              // Get all reports
router.get('/:id', getReportById);        // Get report by ID
router.put('/:id', passport.authenticate('jwt', { session: false }), updateReport); // Update report (authenticated)
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteReport); // Delete report (authenticated)

export default router;

