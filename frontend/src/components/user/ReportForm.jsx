import React, { useState } from "react";
import { useReports } from "../../contexts/ReportContext";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";
import { RiMapPin2Fill } from "react-icons/ri";

import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Swal from 'sweetalert2';



const initialState = {
  disasterType: "",
  severity: "Medium",
  description: "",
  // coordinates: "",
  street: "",
  city: "",
  state: "",
  video: "",
  images: [],
  imagePreviews: []

};

const disasterOptions = [
  "Flood", "Earthquake", "Wildfire", "Hurricane",
  "Tornado", "Landslide", "Tsunami", "Drought", "Other"
];


const ReportForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [marker, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState({ lng: null, lat: null });

  const { createReport } = useReports();

  const validate = () => {
    const err = {};
    if (!formData.disasterType) err.disasterType = "Required";
    if (!formData.severity) err.severity = "Required";
    if (!formData.description) err.description = "Required";
    //if (!formData.coordinates) err.coordinates = "Required";
    if (!formData.city) err.city = "City is required";
    if (!formData.state) err.state = "State is required";
    return err;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // console.log(files)
    const newImagePreviews = files.map(file => URL.createObjectURL(file));

    // Clear previous previews safely
    formData.imagePreviews.forEach(url => URL.revokeObjectURL(url));

    setFormData(prev => ({
      ...prev,
      images: files,         // update with new images
      imagePreviews: newImagePreviews    // update previews
    }));
  };

  // console.log(formData.images)

  const handleMapClick = async (event) => {
    try {
      if (event.lngLat) {
        // const { lng, lat } = event.lngLat;
        const lng = +event.lngLat.lng.toFixed(5);
        const lat = +event.lngLat.lat.toFixed(5);

        setMarker({ lng, lat });
        setCoordinates({ lng, lat });

        reverseGeocode(lng, lat);
      }
    } catch (error) {
      console.log("Error handling map click:", error);
    }
  };


  const forwardGeocode = async (street, city, state) => {
    const query = `${street}, ${city}, ${state}`;
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);

      const { data } = response;
      const feature = data.features[0];
      if (feature) {
        const [lng, lat] = feature.center;
        // setFormData((prev) => ({
        //   ...prev,
        //   coordinates: `${lng},${lat}`,
        // }));
        //setCoordinates({ lng: lng, lat: lat })
        return [lng, lat]; // ✅ RETURN coords
      } else {
        alert("Could not find coordinates for the given address.");
        return null;
      }
    } catch (err) {
      console.error("Forward geocoding failed", err);
      return null;
    }
  };


  const reverseGeocode = async (lng, lat) => {

    try {

      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);

      const { data } = response

      if (!data.features || data.features.length === 0) {
        console.warn("No features returned from Mapbox.");
        return;
      }

      const feature = data.features[0];
      const context = feature.context || [];

      const getText = (id) => context.find((c) => c.id.includes(id))?.text;

      setFormData((prev) => ({
        ...prev,
        street: feature.text || "",
        city: getText("place") || "",
        state: getText("region") || "",
      }));
    } catch (err) {
      console.error("Failed to reverse geocode:", err);
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const err = validate();
  //   if (Object.keys(err).length > 0) return setErrors(err);

  //   setSubmitting(true);
  //   // const [lng, lat] = formData.coordinates.split(",").map(Number);

  //   try {
  //     let lng = coordinates.lng;
  //     let lat = coordinates.lat;

  //     // 🔍 If coordinates are empty, get them from address
  //     if (!lng || !lat) {
  //       const coords = await forwardGeocode(formData.street, formData.city, formData.state);
  //       if (!coords) throw new Error("Could not get coordinates from address");
  //       [lng, lat] = coords;
  //       setCoordinates({ lng: lng, lat: lat }); // this is all you need

  //     }

  //     const reportData = {
  //       disasterType: formData.disasterType,
  //       severity: formData.severity,
  //       description: formData.description,
  //       location: {
  //         type: "Point",
  //         coordinates: [lng, lat], // ✅ Correct array format
  //       },
  //       address: {
  //         street: formData.street,
  //         city: formData.city,
  //         state: formData.state,
  //       },
  //       video: formData.video,
  //        images: formData.images.map((img) => img)  // Use map to return the new array of images
  //     };

  //     const response = await createReport(reportData);
  //     if (onSubmitSuccess) onSubmitSuccess();
  //     setFormData(initialState);
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',   // 👈 top-right
  //       icon: 'success',
  //       title: 'Report submitted successfully!',
  //       showConfirmButton: false,
  //       timer: 3000,           // 👈 auto close after 3 sec
  //       timerProgressBar: true
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to submit.");
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',
  //       icon: 'error',
  //       title: 'Failed to submit the Report!',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //     });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) return setErrors(err);

    setSubmitting(true);

    try {
      let lng = coordinates.lng;
      let lat = coordinates.lat;

      if (!lng || !lat) {
        const coords = await forwardGeocode(formData.street, formData.city, formData.state);
        if (!coords) throw new Error("Could not get coordinates from address");
        [lng, lat] = coords;
        setCoordinates({ lng, lat });
      }


      //console.log('Files to upload:', formData.images);

      // Create FormData instead of plain object
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('disasterType', formData.disasterType);
      formDataToSend.append('severity', formData.severity);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', JSON.stringify({
        type: "Point",
        coordinates: [lng, lat]
      }));
      formDataToSend.append('address', JSON.stringify({
        street: formData.street,
        city: formData.city,
        state: formData.state
      }));
      // if (formData.video) formDataToSend.append('video', formData.video);
      formDataToSend.append('video', formData.video);

      // Append each image file
      formData.images.forEach((file, index) => {
        formDataToSend.append(`images`, file);
      });

      // for (let [key, value] of formDataToSend.entries()) {
      //   console.log(key, value);
      // }

      //console.log(formDataToSend)
      // Send as multipart/form-data
      const response = await createReport(formDataToSend);
      if (onSubmitSuccess) onSubmitSuccess();
      setFormData(initialState);
      Swal.fire({
        toast: true,
        position: 'top-end',   // 👈 top-right
        icon: 'success',
        title: 'Report submitted successfully!',
        showConfirmButton: false,
        timer: 3000,           // 👈 auto close after 3 sec
        timerProgressBar: true
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to submit the Report!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="flex flex-col xl:flex-row gap-8 justify-center items-start mt-8 mb-10 px-4">
      {/* Form - comes first on mobile, left on desktop */}
      <div className="w-full xl:w-[50%] bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-700">📍 Report a Disaster</h2>

          <div>
            <label className="block font-semibold">Disaster Type</label>
            <select name="disasterType" value={formData.disasterType} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400">
              <option value="">Select</option>
              {disasterOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            {errors.disasterType && <p className="text-red-500 text-sm">{errors.disasterType}</p>}
          </div>

          <div>
            <label className="block font-semibold">Severity</label>
            <select name="severity" value={formData.severity} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" rows="4" placeholder="Explain the situation..." />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>


          <div>
            <label className="block font-semibold">Address</label>
            <input name="street" value={formData.street} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="Street Address" />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <input name="city" value={formData.city} onChange={handleChange}
                className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="City" />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="w-full">
              <input name="state" value={formData.state} onChange={handleChange}
                className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="State" />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Video Link (optional)</label>
            <input name="video" value={formData.video} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="YouTube or Cloud link" />
          </div>

          {/* file input */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Upload Images</label>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-violet-400 rounded-lg cursor-pointer hover:bg-violet-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4h10v12m-5 4h.01M12 16h0"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (multiple allowed)</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {formData.imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {formData.imagePreviews.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
          </div>


          {/* <button type="submit" disabled={submitting}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            {submitting ? "Submitting..." : "Submit Report"}
          </button> */}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex justify-center items-center gap-2"
          >
            {submitting ? (
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
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>


      {/* Map */}
      <div className="w-full xl:w-[50%] bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">Click on Map to pick the address</h2>
        <div className="rounded-lg overflow-hidden" style={{ height: "500px" }}>
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            initialViewState={{
              latitude: 20.5937,
              longitude: 78.9629,
              zoom: 4,
            }}
            style={{ width: "100%", height: "100%" }}
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
  );
};

export default ReportForm;
