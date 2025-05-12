
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRequests } from '../../contexts/RequestContext';
import Swal from 'sweetalert2';


const MyRequestCard = ({ request }) => {
  const navigate = useNavigate();
  const { deleteRequest } = useRequests()

  dayjs.extend(relativeTime);
  const isNew = dayjs().diff(dayjs(request.createdAt), 'minute') < 15;

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This report will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          deleteRequest(request._id)
          // ✅ Success alert
          Swal.fire('Deleted!', 'The report has been removed.', 'success');
        }
      });
    } catch (error) {

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to delete Request!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };


  return (
    <div className="p-6 bg-white border-l-4 border-green-500 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 space-y-4 relative">


      {isNew && (
        <span className="absolute top-2 right-2 bg-gradient-to-r from-lime-300 via-emerald-500 to-green-700 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-md mb-3">
          New
        </span>
      )}



      <div className='flex justify-between'>


        <h2 className="text-2xl font-bold text-green-700">{request.type}</h2>
        <p className="text-lg text-gray-600">{request.quantity} Units</p>



        {/* Update & Delete Icons */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/user/edit-request/${request._id}`, { state: { request } })}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Edit report">
            <FaEdit size={18} />
          </button>

          <button
            onClick={(e) => handleDelete(e)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete request">
            <FaTrash size={18} />
          </button>
        </div>

      </div>



      <p className="text-gray-700">{request.description}</p>


      <div className="flex items-center justify-between">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">
          Urgency: {request.urgency}
        </span>

        <span className={`px-3 py-1 rounded-md text-sm font-semibold 
          ${request.status === "Resolved"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
          {request.status}
        </span>
      </div>

      <div className='flex justify-between '>
        <p className="text-sm text-gray-600">
          Requested By: <span className="font-medium text-black">{request.requestedBy?.name || "Unknown"}</span>
        </p>

        <p className="text-sm text-gray-500">
          Requested: <span className="font-medium">{dayjs(request.createdAt).fromNow()}</span>
        </p>
      </div>


      {/* <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors duration-200">
        <Link>Help</Link>
      </button> */}
    </div>
  );
};

export default MyRequestCard;


// import React from 'react';
// import { FaEdit, FaTrash, FaMapMarkerAlt, FaUser, FaImages, FaVideo } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";

// const MyRequestCard = ({ request, onEdit, onDelete }) => {
//   //console.log(request)
//   const navigate = useNavigate();
//   //console.log(request)

//   return (
//     <div className=" w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 border-l-4 border-red-500">
//       <div className="p-4">
//         {/* Header with disaster type and actions */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 capitalize">
//               {request.type}
//             </h2>
//             <div className="flex items-center text-gray-600 mt-1">
//               <FaMapMarkerAlt className="mr-1" />
//               <span>{request.location.address}</span>
//             </div>
//           </div>

//           <div className="flex space-x-2">
//             <button
//               onClick={() => navigate(`/user/edit-request/${request._id}`, { state: { request } })}
//               className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
//               aria-label="Edit request"

//             >
//               <FaEdit />
//             </button>
//             <button
//               onClick={onDelete}
//               className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
//               aria-label="Delete request"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-gray-700 mb-4 px-2 py-3 bg-gray-50 rounded-lg">
//           {request.description}
//         </p>

//         {/* Status and severity */}
//         <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
//           <div className="flex items-center">
//             <span className="font-medium mr-2 text-gray-700">Severity:</span>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold ${request.severity === 'High' ? 'bg-red-100 text-red-800' :
//                 request.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-green-100 text-green-800'
//                 }`}
//             >
//               {request.urgency}
//             </span>
//           </div>

//           <div className="flex items-center">
//             <span className="font-medium mr-2 text-gray-700">Status:</span>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                 }`}
//             >
//               {request.status}
//             </span>
//           </div>
//         </div>

//         {/* requested by and date */}
//         <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-3">
//           <div className="flex items-center">
//             <FaUser className="mr-1" />
//             <span>requested by: <span className="font-medium">{request.requestedBy?.name || "Unknown"}</span></span>
//           </div>
//           <div>
//             <span>Date: <span className="font-medium">{new Date(request.date).toLocaleDateString()}</span></span>
//           </div>
//         </div>

//         {/* Media links */}
//         <div className="flex justify-center space-x-6 mt-4 pt-3 border-t">
//           <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
//             <FaImages className="mr-2" />
//             View Pictures
//           </button>
//           <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
//             <FaVideo className="mr-2" />
//             Watch Videos
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyRequestCard;