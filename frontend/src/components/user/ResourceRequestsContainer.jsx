import React, { useEffect } from "react";
import { useRequests } from "../../contexts/RequestContext";
import RequestList from "./RequestList";

const ResourceRequestsContainer = () => {

  // Access state and functions from the RequestContext
  const { requests, loading, error, fetchAllRequests } = useRequests();

  const sortedRequests = [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  // Fetch all requests when the component mounts
  useEffect(() => {
    fetchAllRequests();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading resource requests...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Render the list of requests
  return (

    <div className=" mt-16 px-4">
      <h2 className=" inline-block text-3xl ld:text-4xl font-extrabold  mb-6 text-green-500  border-b-3 border-b-green-500">
        Requested Resources
      </h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No Requests found.</p>
      ) : (
        <RequestList requests={sortedRequests} />
      )}
    </div>
  );
};

export default ResourceRequestsContainer;




















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ResourceRequests = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("/api/resource-requests");
//         setRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching resource requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   return (
//     <div className="resource-requests">
//       <h2>Resource Requests</h2>
//       {requests.length > 0 ? (
//         <ul>
//           {requests.map((request) => (
//             <li key={request.id}>
//               <strong>{request.resourceType}</strong> - {request.quantity} needed at {request.location}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No active resource requests.</p>
//       )}
//     </div>
//   );
// };

// export default ResourceRequests;
