
import React, { useState, useEffect } from "react";
import { useReports } from "../../contexts/ReportContext";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";
import { RiMapPin2Fill } from "react-icons/ri";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
};

const disasterOptions = [
  "Flood", "Earthquake", "Wildfire", "Hurricane",
  "Tornado", "Landslide", "Tsunami", "Drought", "Other"
];

const EditReportForm = ({ onSubmitSuccess }) => {

  const { state } = useLocation();
  const { updateReport } = useReports();

  const report = state?.report;


  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const [marker, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState({ lng: null, lat: null });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (report) {
      setFormData({
        disasterType: report.disasterType,
        severity: report.severity,
        description: report.description,
        status: report.status,
        video: report.video || "",
        images: report.images || [],
        street: report.address?.street || "",
        city: report.address?.city || "",
        state: report.address?.state || ""

      });
      setPreviewImages(report.images.map(img => img.url));
    }
  }, [report]);



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
    const urls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: urls }));
  };


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
        setFormData((prev) => ({
          ...prev,
          coordinates: `${lng},${lat}`,
        }));
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) return setErrors(err);

    setUpdating(true);
    // const [lng, lat] = formData.coordinates.split(",").map(Number);

    try {

      let lng = coordinates.lng;
      let lat = coordinates.lat;

      // 🔍 If coordinates are empty, get them from address
      if (!lng || !lat) {
        const coords = await forwardGeocode(formData.street, formData.city, formData.state);
        if (!coords) throw new Error("Could not get coordinates from address");
        [lng, lat] = coords;
        setCoordinates({ lng: lng, lat: lat }); // this is all you need

      }

      const reportData = {
        disasterType: formData.disasterType,
        severity: formData.severity,
        description: formData.description,
        location: {
          type: "Point",
          coordinates: [lng, lat], // ✅ Correct array format
        },
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
        },
        video: formData.video,
        images: formData.images.map(url => ({ url })),
      };



      const response = await updateReport(report._id, reportData);


      if (onSubmitSuccess) onSubmitSuccess();
      setFormData(initialState);
      Swal.fire({
        toast: true,
        position: 'top-end',   // 👈 top-right
        icon: 'success',
        title: 'Report updated successfully!',
        showConfirmButton: false,
        timer: 3000,           // 👈 auto close after 3 sec
        timerProgressBar: true
      });
    } catch (err) {
      //console.error(err);
      alert("Failed to update.");
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

    } finally {
      setUpdating(false);
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
                className="w-full border border-violet-300 p-2 rounded" placeholder="State" />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Video Link (optional)</label>
            <input name="video" value={formData.video} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="YouTube or Cloud link" />
          </div>

          <div>
            <label className="block font-semibold">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload}
              className="w-full text-sm text-gray-700 file" />
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.images.map((url, i) => (
                  <img key={i} src={url} alt="Preview" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          {/* <button type="submit" disabled={updating}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            {updating ? "updating..." : "Update Report"}
          </button> */}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex justify-center items-center gap-2"
          >
            {updating ? (
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
                Updating...
              </>
            ) : (
              "Update Report"
            )}
          </button>
        </form>
      </div>


      {/* Map - comes second on mobile, right on desktop */}
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

export default EditReportForm;
