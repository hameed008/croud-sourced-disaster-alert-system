import React, { createContext, useState, useContext } from "react";
import {
  fetchRequest,
  createRequest as createRequestApi,
  updateRequest as updateRequestApi,
  deleteRequest as deleteRequestApi,
} from "../services/request"; // Import API functions

// Create the RequestContext
const RequestContext = createContext();

// Create the RequestProvider component
export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]); // List of requests
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all requests
  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest();
      //console.log(response)
      //console.log(response.data.data)
      setRequests(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new request
  const createRequest = async (requestData) => {
    setLoading(true);
    try {
      const response = await createRequestApi(requestData);
      setRequests((prevRequests) => [...prevRequests, response.data.data]);
      setError(null);
      return response.data.data; // Return the created request
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Update a request
  const updateRequest = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await updateRequestApi(id, updatedData);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? response.data.data : request
        )
      );
      setError(null);
      return response.data.data; // Return the updated request
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update request.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Delete a request
  const deleteRequest = async (id) => {
    setLoading(true);
    try {
      await deleteRequestApi(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete request.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Provide the context value
  const value = {
    requests,
    loading,
    error,
    fetchAllRequests,
    createRequest,
    updateRequest,
    deleteRequest,
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
};

// Custom hook to use the RequestContext
export const useRequests = () => useContext(RequestContext);

///////////////////////////////////////////////////////////////////////////
// import React, { createContext, useState, useContext } from "react";
// import axios from "axios";

// // Create the RequestContext
// const RequestContext = createContext();

// // Create the RequestProvider component
// export const RequestProvider = ({ children }) => {
//   const [requests, setRequests] = useState([]); // List of requests
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch all requests
//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/requests");
//       setRequests(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch requests.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create a new request
//   const createRequest = async (requestData) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/requests", requestData);
//       setRequests((prevRequests) => [...prevRequests, response.data.data]);
//       setError(null);
//       return response.data.data; // Return the created request
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create request.");
//       throw err; // Re-throw the error for handling in the component
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update a request
//   const updateRequest = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`/api/requests/${id}`, updatedData);
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request._id === id ? response.data.data : request
//         )
//       );
//       setError(null);
//       return response.data.data; // Return the updated request
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update request.");
//       throw err; // Re-throw the error for handling in the component
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a request
//   const deleteRequest = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`/api/requests/${id}`);
//       setRequests((prevRequests) =>
//         prevRequests.filter((request) => request._id !== id)
//       );
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete request.");
//       throw err; // Re-throw the error for handling in the component
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Provide the context value
//   const value = {
//     requests,
//     loading,
//     error,
//     fetchRequests,
//     createRequest,
//     updateRequest,
//     deleteRequest,
//   };

//   return (
//     <RequestContext.Provider value={value}>
//       {children}
//     </RequestContext.Provider>
//   );
// };

// // Custom hook to use the RequestContext
// export const useRequests = () => useContext(RequestContext);