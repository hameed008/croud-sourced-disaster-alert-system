import { createContext, useContext, useState, useEffect, use } from 'react';
import {
  loginUser,
  forgotPassword,
  resetPassword,
  registerUser,
  verifyOTP,
  resendOTP as resendOTPApi,
  fetchVolunteers as fetchVolunteersApi,
  updateUser as updateUserApi
} from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [volunteers, setVolunteers] = useState([])
  // const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      fetchUserProfile(token);
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await response.json();
      setUser(userData);
      setIsLoggedIn(true)
    } catch (error) {
      logout();
    }
  };


  // Fetch Volunteers 
  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const response = await fetchVolunteersApi()
      setVolunteers(response.data.data.volunteers)
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch volunteers.");
    } finally {
      setLoading(false)

    }
  }

  // Login User
  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);
      const { userData, token } = await data;
      const { user } = userData
      localStorage.setItem('token', token);
      setUser(user);

      setIsLoggedIn(!isLoggedIn)
      return { success: true, user }; // Return success status and user data
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      return { success: false, message };
    }
  };

  // Forgot Password
  const forgotUserPassword = async (email) => {
    try {
      const response = await forgotPassword(email)
      return response

    } catch (error) {
      return { success: false, message: 'Please provide a valid email address' }; // Handle error
    }
  }

  // Reset Password
  const resetUserPassword = async (token, password) => {
    try {
      const response = await resetPassword(token, password)
      return response

    } catch (error) {
      return { success: false, message: "Login failed" }; // Handle error
    }
  }


  // Register User
  const register = async (userData) => {
    // console.log('yes')
    try {

      const response = await registerUser(userData);
      // const { userData, token } = response.data;
      // localStorage.setItem('token', token);
      // setUser(user);
      return response // Return success status and user data
    } catch (error) {
      return { success: false, message: "Registration failed" }; // Handle error
    }
  };

  // const verifyEmail = async (otpPayload) => {
  //   try {
  //     const response = await verifyOTP(otpPayload);
  //     // console.log('Verify OTP Response:', response); // Debug log

  //     if (response.data.success) {  // Check for success flag

  //       const { userData, token } = response.data; // Assuming response has data property
  //       const { user } = userData
  //       localStorage.setItem('token', token);

  //       // Update state more reliably
  //       setUser(user);
  //       setIsLoggedIn(true);

  //       return {
  //         success: true,
  //         status: 200,
  //       };
  //     }
  //     return response; // Return the original response if no success

  //   } catch (error) {
  //     console.error('OTP Verification Error:', error);
  //     return {
  //       success: false,
  //       message: error.response?.data?.message || "OTP verification failed"
  //     };
  //   }
  // };

  // Verify OTP
  const verifyEmail = async (otpPayload) => {
    try {
      const response = await verifyOTP(otpPayload);

      // 1. More robust success check
      if (!response?.data?.success) {
        return {
          success: false,
          message: response?.data?.message || "OTP verification failed",
          status: response?.status || 400
        };
      }

      // 2. Destructure more safely
      const { userData, token } = response.data;
      if (!userData?.user || !token) {
        throw new Error("Invalid response structure");
      }

      // 3. Store token before state update
      localStorage.setItem('token', token);

      // 4. Atomic state update
      setUser(prev => ({ ...prev, ...userData.user }));
      setIsLoggedIn(true);

      return {
        success: true,
        status: 200,
        user: userData.user, // Return user data for immediate use
        token: token
      };

    } catch (error) {
      console.error('OTP Verification Error:', error);

      // 5. Better error parsing
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "OTP verification failed";

      return {
        success: false,
        message: errorMessage,
        status: error.response?.status || 500
      };
    }
  };


  // resend OTP
  const resendOTP = async (userEmail) => {
    const response = await resendOTPApi(userEmail)
    // console.log(response)
    return response
  }

  // Logout User
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(!isLoggedIn)
  };

  // Update User
  const updateUser = async (id, userData) => {
    try {
      const response = await updateUserApi(id, userData)
      const { user } = response.data
      setUser(user)
      return response
    } catch (error) {
      return { success: false, message: "Failed to updated User" }
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, forgotUserPassword, resetUserPassword, register, verifyEmail, resendOTP, logout, error, loading, isLoggedIn, volunteers, fetchVolunteers, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
