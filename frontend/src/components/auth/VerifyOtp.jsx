import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2';


const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState("");
  //const [message, setMessage] = useState("");
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const { verifyEmail, resendOTP } = useAuth()

  // const handleVerify = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const otpPayload = { email, code: otp }
  //     //const res = await axios.post("/api/auth/verify-otp", { email, code: otp });
  //     const res = await verifyEmail(otpPayload)
  //     console.log(res)

  //     if (res.status === 200) {

  //       setMessage("OTP Verified! Redirecting...");
  //       // localStorage.setItem("token", res.data.token); // if backend sends token
  //       // setTimeout(() => navigate("/dashboard"), 1500);
  //       navigate('/')
  //     }
  //   } catch (err) {
  //     setMessage("Invalid or expired OTP. Try again.");
  //   }
  // };

  // const handleVerify = async (e) => {
  //   e.preventDefault();
  //   setMessage("Verifying...");
  //   try {
  //     const otpPayload = { email, code: otp };
  //     const res = await verifyEmail(otpPayload);
  //     // console.log('Verification Result:', res);

  //     if (res.success && res.status === 200) {
  //       setMessage("OTP Verified! Redirecting...");
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',   // 👈 top-right
  //         icon: 'success',
  //         title: message,
  //         showConfirmButton: false,
  //         timer: 3000,           // 👈 auto close after 3 sec
  //         timerProgressBar: true
  //       });
  //       // Wait briefly to ensure state updates
  //       // await new Promise(resolve => setTimeout(resolve, 100));

  //       navigate('/'); // Redirect to dashboard
  //     } else {
  //       setMessage(res.message || "Verification failed");
  //     }
  //   } catch (err) {
  //     setMessage(err.message || "Invalid or expired OTP. Try again.");
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',
  //       icon: 'error',
  //       title: message,
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //     });
  //   }
  // };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    // setMessage("Verifying...");

    try {
      const otpPayload = { email, code: otp };
      const res = await verifyEmail(otpPayload);

      if (res.success && res.status === 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: "OTP Verified! Redirecting...",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate('/user');
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: res.message || "Verification failed",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }

    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message || "Invalid or expired OTP. Try again.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setVerifying(false);
    }
  };


  const resendOTPCode = async () => {

    setResending(true);
    try {
      const userEmail = { email };
      const res = await resendOTP(userEmail);
      if (res.status === 200) {
        //  setMessage("OTP resent successfully!");
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'OTP resent successfully!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }

    } catch {
      //setMessage("Failed to resend OTP.");
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to resend OTP!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full h-screen px-6 flex items-center">
      <div className=" w-full max-w-md mx-auto p-6 shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4 text-center">🔐 Verify OTP</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
            maxLength={6}
            required
          />
          <button
            type="submit"
            disabled={verifying}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 flex justify-center items-center gap-2"
          >
            {verifying ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* {message && <p className="text-center text-sm text-gray-600">{message}</p>} */}
        </form>
        <button
          disabled={resending}
          onClick={resendOTPCode}
          className="mt-4 text-sm text-indigo-600 hover:underline w-full text-center flex justify-center items-center gap-2"
        >
          {resending ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Resending...
            </>
          ) : (
            "🔁 Resend OTP"
          )}
        </button>

      </div>
    </div>
  );
};

export default VerifyOtp;
