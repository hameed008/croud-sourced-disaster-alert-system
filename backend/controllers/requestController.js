// Description: This file contains the logic for handling requests.
// Import the Request model and the asyncHandler utility.
import Request from '../models/Request.js';
import { sendSMS } from '../utils/sendSMS.js';
import asyncHandler from 'express-async-handler';
import { sendEmail } from '../utils/email/sendEmail.js';
import { resourceRequestConfirmationEmail } from '../utils/email/templates.js';


// @desc    Create a new request
// @route   POST /api/requests
// @access  Public
const createRequest = asyncHandler(async (req, res) => {
  const {
    type,
    quantity,
    description,
    location,
    address,
    urgency,
    requestedBy,
    relatedIncident,
    deadline,

  } = req.body;

  try {
    const request = await Request.create({
      type,
      quantity,
      description,
      location,
      address,
      urgency,
      requestedBy,
      relatedIncident,
      deadline,
      requestedBy: req.user.id, // Assuming user is authenticated
    });

    res.status(201).json({
      success: true,
      data: request
    });

    // Send Request Registration Confirmation Mail to user:

    await sendEmail({
      to: email,
      subject: "✅ Your Disaster Report Has Been Registered",
      html: resourceRequestConfirmationEmail(request)
    });

  } catch (error) {
    res.status(501).json({ success: false, message: 'Failed to register request', error: error.message })
  }
});

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find().populate('requestedBy fulfilledBy relatedIncident');
  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests
  });
});

// @desc    Get a single request by ID
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id).populate('requestedBy fulfilledBy relatedIncident');

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  res.status(200).json({
    success: true,
    data: request
  });
});

// @desc    Update a request
// @route   PUT /api/requests/:id
// @access  Public
const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  res.status(200).json({
    success: true,
    data: request
  });
});

// @desc    Delete a request
// @route   DELETE /api/requests/:id
// @access  Public
const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findByIdAndDelete(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

export default {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest
};



// @desc  Approve a request
export const approveRequest = async (req, res) => {
  const { requestId } = req.params;

  const updated = await Request.findByIdAndUpdate(
    requestId,
    { status: "Fulfilled" },
    { new: true }
  ).populate("requestedBy");

  if (updated?.requestedBy?.phone) {
    await sendSMS(
      updated.requestedBy.phone,
      `✅ Your request for ${updated.type} has been fulfilled. Stay safe!`
    );
  }

  res.json({ success: true, message: "Request approved and user notified." });
};
