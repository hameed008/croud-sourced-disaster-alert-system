
import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
//import logo from "../assets/logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../components/Logo";
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const err = {};
    if (!formData.email) err.email = "Email is required.";
    if (!formData.password) err.password = "Password is required.";
    return err;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await login(formData);

      //console.log(response)
      //  console.log(response.user?.role)
      if (response.success && response.user?.role === 'admin') {
        navigate("/admin");
      } else if (response.success && response?.user.role === 'volunteer') {
        navigate("/volunteer");
      } else if (response.success && response?.user.role === 'user') {
        navigate("/user"); // user
      } else {
        setSubmitError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setSubmitError("An error occurred. Please try again.");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-blue-100">
      {/* <div className="relative min-h-screen flex items-center justify-center bg-[url('images/bg-image.jpg')] bg-cover bg-center bg-fixed"> */}
      {/* Blur overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 to-blue-100/70 backdrop-blur-xs"></div> */}
      {/* Back Button */}
      <button
        onClick={() => navigate('/user')}
        className="flex items-center absolute left-4 lg:left-50 top-10 text-violet-600 hover:text-violet-800  mb-16"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6 mx-8">
        {/* Logo */}
        {/* <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-2" />
        </div> */}
        <Logo></Logo>

        <h2 className="text-3xl font-bold text-center text-violet-600">Login</h2>
        {submitError && <p className="text-red-500 text-center text-sm">{submitError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="resqmap@gmail.com"
              className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-400 ring-red-300" : "border-violet-300 focus:ring-violet-400"
                }`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.password ? "border-red-400 ring-red-300" : "border-violet-300 focus:ring-violet-400"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-violet-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-violet-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

