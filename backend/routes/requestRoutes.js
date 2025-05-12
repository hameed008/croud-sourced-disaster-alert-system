// Description: Handles all routes for requests
// Methods: POST, GET, PUT, DELETE
import express from 'express';
import requestController from '../controllers/requestController.js';
import passport from 'passport';

const router = express.Router();

// Create a new request
router.post('/', passport.authenticate('jwt', { session: false }), requestController.createRequest);

// Get all requests
router.get('/', requestController.getRequests);

// Get a single request by ID
router.get('/:id', requestController.getRequestById);

// Update a request
router.put('/:id', passport.authenticate('jwt', { session: false }), requestController.updateRequest);

// Delete a request
router.delete('/:id', passport.authenticate('jwt', { session: false }), requestController.deleteRequest);

export default router;