import razorpay from "../utils/razorpayInstance.js";
import crypto from 'crypto'

export const processPayment = async (req, res) => {
  // const { amount, currency } = req.body;
  const { amount } = req.body;


  const options = {
    amount: Number(req.body.amount * 100), // amount in smallest unit
    currency: 'INR',
    receipt: "receipt_order_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order creation failed", error });
  }
};


export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY
  })
}

export const paymentVerfication = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
  const body = razorpay_order_id + "|" + razorpay_payment_id
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')
  //console.log(`Razorpay Signature', ${razorpay_signature}`)
  // console.log(`Expected Signature', ${expectedSignature}`)
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    // return res.redirect(`https://croud-sourced-disaster-alert-system-396s.vercel.app/paymentSuccess?reference=${razorpay_payment_id}`);
    //return res.redirect(`http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`);
    return res.redirect(`${process.env.FRONTEND_API}/paymentSuccess?reference=${razorpay_payment_id}`);

  } else {
    res.status(404).json({ success: false })
  }
}