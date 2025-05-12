import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import VerifyOtp from "../components/auth/VerifyOtp";
import { FaArrowLeft } from 'react-icons/fa';
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";
import { RiMapPin2Fill } from "react-icons/ri";
import "mapbox-gl/dist/mapbox-gl.css";
import { dark } from "@mui/material/styles/createPalette";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [registering, setRegistering] = useState(false)
  const [marker, setMarker] = useState(null);
  //const [coordinates, setCoordinates] = useState({ lng: null, lat: null });



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // phone: "",
    password: "",
    role: "user",
    organization: "",
    adminCode: "",
    profilePhoto: null,
    coordinates: '',
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setFormData({ ...formData, role: selectedRole });
  };

  const handleCoordsChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, coordinates: value }));

    const [lng, lat] = value.split(",").map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      reverseGeocode(lng, lat);
    }
  };

  const handleMapClick = async (event) => {
    try {
      if (event.lngLat) {
        // const { lng, lat } = event.lngLat;
        const lng = +event.lngLat.lng.toFixed(5);
        const lat = +event.lngLat.lat.toFixed(5);
        //  console.log(lng, lat)

        setFormData((prev) => ({
          ...prev,
          coordinates: [lng, lat],
        }))

        setMarker({ lng, lat });
        // setCoordinates({ lng, lat });
        // reverseGeocode(lng, lat);
      }
    } catch (error) {
      console.log("Error handling map click:", error);
    }
  };


  // const reverseGeocode = async (lng, lat) => {

  //   try {
  //     const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);

  //     const { data } = response;

  //     if (!data.features || data.features.length === 0) {
  //       console.warn("No features returned from Mapbox.");
  //       return;
  //     }

  //     const feature = data.features[0];
  //     const context = feature.context || [];

  //     const getText = (id) => context.find((c) => c.id.includes(id))?.text;

  //     setFormData((prev) => ({
  //       ...prev,
  //       street: feature.text || "",
  //       city: getText("place") || "",
  //       state: getText("region") || "",
  //       zipCode: getText("postcode") || "",
  //     }));
  //   } catch (err) {
  //     console.error("Failed to reverse geocode:", err);
  //   }
  // };


  const validate = () => {
    const err = {};
    if (!formData.name || formData.name.length < 2) err.name = "Name must be at least 2 characters";
    if (!formData.email.includes("@")) err.email = "Enter a valid email";
    //  if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) err.phone = "Enter a valid phone number";
    if (!formData.password || formData.password.length < 6) err.password = "Password must be 6+ characters";
    if (role === "volunteer" && !formData.organization) err.organization = "Organization is required";
    if (role === "admin" && !formData.adminCode) err.adminCode = "Admin code is required";

    // Validate image (optional)
    if (formData.profilePhoto && formData.profilePhoto.size > 2 * 1024 * 1024) {
      err.profilePhoto = "Image must be less than 2MB";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    //  console.log('yes')
    setRegistering(true)
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) return setErrors(err);

    try {
      //? OLD
      // Create FormData for file upload
      // const formDataToSend = new FormData();
      // for (const key in formData) {
      //   formDataToSend.append(key, formData[key]);
      // }

      //? Method 1:
      const formDataToSend = new FormData();
      // Handle each field explicitly
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('role', formData.role);

      // Special handling for coordinates array
      // 1. For GeoJSON Point structure
      const geoData = {
        type: "Point",
        coordinates: formData.coordinates // [lng, lat]
      };

      // 2. Stringify the entire location object
      formDataToSend.append('location', JSON.stringify(geoData));


      // Only append these if they exist
      if (formData.organization) {
        formDataToSend.append('organization', formData.organization);
      }

      if (formData.adminCode) {
        formDataToSend.append('adminCode', formData.adminCode);
      }

      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }


      //? Method 2:
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value === null || value === undefined) return;

      //   if (key === 'coordinates') {
      //     // Handle array separately
      //     value.forEach((coord, index) => {
      //       formDataToSend.append(`coordinates[${index}]`, coord.toString());
      //     });
      //   } else if (value instanceof File) {
      //     // Handle files
      //     formDataToSend.append(key, value);
      //   } else {
      //     // Handle all other values
      //     formDataToSend.append(key, typeof value === 'object'
      //       ? JSON.stringify(value)
      //       : value.toString()
      //     );
      //   }
      // });



      const res = await register(formDataToSend);
      // console.log(res)
      if (res.status === 200 && res.data.success) {
        setRegisteredEmail(formData.email);
        setShowOtpForm(true);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: "Registration Successful Verify Email!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: err.message || "Registration failed",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        // setErrors(res.message || "Login failed. Please try again.");
      }
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message || "Registration failed",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setRegistering(false)
    }
  };

  return (
    showOtpForm ? (
      <VerifyOtp email={registeredEmail} />
    ) : (
      <div className="w-full bg-gradient-to-br from-violet-50 to-blue-100 relative pb-4">
        <div className="w-[90%] min-h-screen flex flex-col xl:flex-row justify-center gap-6 items-center px-1 pt-20 xl:pt-16 mx-auto">
          <div className=" w-full xl:w-[40%] flex flex-col items-center justify-center">

            {/* Back Button */}
            <button
              onClick={() => navigate('/user')}
              className="flex items-center absolute left-4 lg:left-16 top-6 text-violet-600 hover:text-violet-800 mb-16"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>

            <div className="w-full max-w-lg bg-white p-4 rounded-xl shadow-xl">
              <form onSubmit={handleSubmit} className="w-full space-y-4" encType="multipart/form-data">
                <h2 className="text-2xl font-bold text-center text-violet-600">Register</h2>

                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center">
                  <label className="relative w-24 h-24 mb-4 overflow-hidden group cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange} // your function to handle image upload
                    />
                    <img
                      src={previewImage || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                      alt="Profile preview"
                      className="w-full h-full rounded-full object-cover border-2 border-violet-300 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l3-3h4l3 3h4v13H3V7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a3 3 0 110 6 3 3 0 010-6z" />
                      </svg>
                    </div>
                  </label>

                  {errors.profilePhoto && <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>}
                </div>

                {["name", "email", "password"].map((field) => (
                  <div key={field} className="relative"> {/* Add relative positioning */}
                    <label className="block text-sm font-medium capitalize text-gray-700">
                      {field}
                    </label>
                    <input
                      type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="mt-1 w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
                      placeholder={`Enter your ${field}`}
                      required
                    />
                    {/* Eye toggle button (only for password field) */}
                    {field === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500 focus:outline-none"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    )}
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}

                {/* Coordinates */}
                <div>
                  <label className="block text-sm font-medium capitalize text-gray-700">Coordinates (lng, lat)</label>
                  <input name="coordinates" value={formData.coordinates} onChange={handleCoordsChange}
                    className="mt-1 w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="77.1025,28.7041" />
                  {errors.coordinates && <p className="text-red-500 text-sm">{errors.coordinates}</p>}
                </div>

                {/* Role Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={role}
                    onChange={handleRoleChange}
                    className="mt-1 w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
                  >
                    <option value="user">User</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {role === "volunteer" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Organization</label>
                    <input
                      type="text"
                      className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                    />
                    {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
                  </div>
                )}

                {role === "admin" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admin Code</label>
                    <input
                      type="text"
                      className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
                      value={formData.adminCode}
                      onChange={(e) =>
                        setFormData({ ...formData, adminCode: e.target.value })
                      }
                    />
                    {errors.adminCode && <p className="text-red-500 text-xs mt-1">{errors.adminCode}</p>}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={registering}
                  className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 flex justify-center items-center gap-2"
                >
                  {registering ? (
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
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <a href="/login" className="text-violet-600 hover:underline">
                  Login here
                </a>
              </p>
            </div>

          </div>
          {/* Map - comes second on mobile, right on desktop */}
          <div className="w-full xl:w-[60%] bg-white p-4 rounded-lg shadow-lg xl:mr-8">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">Click on Map to pick Coordinates</h2>
            <div className="rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                initialViewState={{
                  latitude: 20.5937,
                  longitude: 78.9629,
                  zoom: 4,
                }}
                style={{ width: "100%", height: 700 }}
                mapStyle="mapbox://styles/hameed003/cm9il9s0z003i01sb0stmcvsf"
                onClick={handleMapClick}
              >
                {marker && (
                  <Marker longitude={marker.lng} latitude={marker.lat}>
                    <RiMapPin2Fill size={30} color="red" />
                  </Marker>
                )}
              </Map>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;