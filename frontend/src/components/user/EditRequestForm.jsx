import React, { useState, useEffect } from "react";
import { useRequests } from "../../contexts/RequestContext";
import axios from "axios";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";
import { RiMapPin2Fill } from "react-icons/ri";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';




const initialState = {
  type: "",
  quantity: 1,
  description: "",
  // coordinates: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  urgency: "Medium",
  deadline: "",
};



const resourceTypes = [
  "Food", "Water", "Medical Supplies", "Shelter",
  "Transportation", "Clothing", "Other"
];


const EditRequestForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const [marker, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState({ lng: null, lat: null });

  const { state } = useLocation();
  const request = state?.request;
  const { updateRequest } = useRequests()

  useEffect(() => {
    if (request) {
      setFormData({
        type: request.type,
        quantity: Number(request.quantity),
        description: request.description,
        urgency: request.urgency,
        deadline: request.deadline || null,
        street: request.address?.street,
        city: request.address?.city,
        state: request.address?.state,
        zipCode: request.address?.zipCode,
      });
    }
  }, [request]);


  const validate = () => {
    const err = {};
    if (!formData.type) err.type = "Required";
    if (!formData.quantity || formData.quantity < 1) err.quantity = "Min 1 required";
    // if (!formData.coordinates) err.coordinates = "Coordinates required";
    return err;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

        // setFormData((prev) => ({
        //   ...prev,
        //   coordinates: `${lng},${lat}`,
        // }));
        //setCoordinates({ lng: lng, lat: lat })
        const [lng, lat] = feature.center;
        return [lng, lat]; // ✅ Return coordinates here
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

      const { data } = response;

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
        zipCode: getText("postcode") || "",
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
    //const [lng, lat] = formData.coordinates.split(",").map(Number);


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

      const requestData = {
        type: formData.type,
        quantity: Number(formData.quantity),
        description: formData.description,
        urgency: formData.urgency,
        deadline: formData.deadline || null,
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
        // address: formData.address || ""
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      }

      const res = await updateRequest(request._id, requestData);

      if (onSubmitSuccess) onSubmitSuccess();
      setFormData(initialState);
      Swal.fire({
        toast: true,
        position: 'top-end',   // 👈 top-right
        icon: 'success',
        title: 'Request Updated Successfully!',
        showConfirmButton: false,
        timer: 3000,           // 👈 auto close after 3 sec
        timerProgressBar: true
      });

    } catch (err) {
      // console.error(err);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Resource Update failed!',
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
          <h2 className="text-2xl font-bold text-center text-gray-700">🆘 Request Resources</h2>

          {/* Resource Type */}
          <div>
            <label className="block font-semibold">Resource Type</label>
            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full border border-violet-300 p-2 rounded">
              <option value="">Select type</option>
              {resourceTypes.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold">Quantity Needed</label>
            <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>

          {/* Description */}
          <div >
            <label className="block font-semibold">Description (optional)</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
              placeholder="What do you need and why?" />
          </div>


          {/* Address */}
          <div>
            <label className="block font-semibold">Address</label>
            <input name="street" value={formData.street} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="Street Address" />
          </div>

          <div className=" flex justify-between" >

            {/* City */}
            <div>
              {/* <label className="block font-semibold">City</label> */}
              <input name="city" value={formData.city} onChange={handleChange}
                className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="City" />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            {/* State */}
            <div>
              {/* <label className="block font-semibold">State</label> */}
              <input name="state" value={formData.state} onChange={handleChange}
                className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="State" />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>

          </div>

          {/* zipCode */}
          <div>
            {/* <label className="block font-semibold">zipCode</label> */}
            <input name="zipCode" value={formData.zipCode} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400" placeholder="Postal / Zip Code" />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>

          {/* Urgency */}
          <div>
            <label className="block font-semibold">Urgency Level</label>
            <select name="urgency" value={formData.urgency} onChange={handleChange}
              className="w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Deadline */}
          <div className="">
            <label className="block font-semibold">Deadline (optional)</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange}
              className="w-full border border-violet-300 p-2 rounded" />
          </div>

          {/* <button type="submit" disabled={submitting}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            {submitting ? "Submitting..." : "Update Requests"}
          </button>
           */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex justify-center items-center gap-2"
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
              "Update Request"
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

export default EditRequestForm;


