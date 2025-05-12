// // /ResetPassword.jsx
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`/api/auth/reset-password/${token}`, { password });
//     alert("Password updated.");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Reset Password</h2>
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="New password"
//         required
//       />
//       <button type="submit">Reset</button>
//     </form>
//   );
// }

// ResetPassword.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPassword() {

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const { resetUserPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setSubmitError("Password and Confirm Password should be same");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetUserPassword(token, { password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-indigo-600">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a new password for your account
        </p>

        {submitError && <p className="text-red-500 text-center text-sm">{submitError}</p>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 mx-6 px-6 shadow-lg rounded-xl sm:px-10 border border-gray-100">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Password Updated!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength="8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a strong password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[18px] text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>

                <label
                  htmlFor="confirm password"
                  className="block text-sm font-medium text-gray-700 mt-6"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength="8"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[18px] text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>


              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}