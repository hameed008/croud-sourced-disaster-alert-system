import express from "express";
import { processPayment } from "../controllers/paymentController.js";
import { getKey } from "../controllers/paymentController.js";
import { paymentVerfication } from "../controllers/paymentController.js";

const router = express.Router();
router.post("/payment-process", processPayment);
router.get("/getKey", getKey);
router.post("/paymentVerification", paymentVerfication);


export default router;
