// PaymentSuccess.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  console.log(query)
  const reference = query.get('reference');
  console.log(reference)

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center">
        <div className="text-green-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-700">Payment Successful</h1>
        <p className="mt-2 text-gray-600">Thank you! Your payment has been processed successfully.</p>


        {reference && (
          <div className="mt-6 text-left text-sm text-gray-700">
            {/* <p><span className="font-semibold">Payment ID:</span> {paymentId}</p> */}
            <p><span className="font-semibold">Reference:</span> {reference}</p>
          </div>
        )
        }

        <button
          onClick={() => navigate('/user')}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
