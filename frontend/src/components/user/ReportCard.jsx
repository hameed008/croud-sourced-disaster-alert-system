import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const ReportCard = ({ report }) => {

  dayjs.extend(relativeTime);
  const isNew = dayjs().diff(dayjs(report.createdAt), 'minute') < 15;
  const navigate = useNavigate()
  const { state } = useLocation()



  return (
    <div className="p-4 bg-white border-l-4 border-red-500 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 space-y-4 relative">

      {isNew && (
        <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
          New
        </span>
      )}

      <div className="flex items-center mt-3 justify-between">
        <h2 className="text-2xl font-bold text-red-600">
          {report.disasterType}
        </h2>
        <h3 className="text-lg text-gray-500">{report.address.city}</h3>
      </div>

      <p className="text-gray-700">{report.description}</p>

      <div className="flex items-center justify-between">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">
          Severity: {report.severity}
        </span>

        <span className={`px-3 py-1 rounded-md text-sm font-semibold 
          ${report.status === "Resolved"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
          {report.status}
        </span>
      </div>

      <div className='flex justify-between '>
        <p className="text-sm text-gray-600">
          Reported By: <span className="font-medium text-black">{report.reportedBy?.name || "Unknown"}</span>
        </p>

        <p className="text-sm text-gray-500">
          Reported: <span className="font-medium">{dayjs(report.createdAt).fromNow()}</span>
        </p>
      </div>

      <div className="flex items-center justify-between text-blue-600 font-medium underline hover:underline-offset-2">

        <button onClick={() => navigate('report-picture', { state: { report } })} >Report Picture</button>

        <button onClick={() => navigate('report-video')}>Report Video</button>

      </div>
    </div>
  );
};

export default ReportCard;


////////////////////////////////////////////
// import React from 'react'

// const ReportCard = ({ report }) => {
//   return (
//     <div className="p-6 bg-red-100 flex flex-col gap-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ">

//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">
//           {report.disasterType}
//         </h2>

//         <h2 className="text-xl text-gray-600">{report.location.address}</h2>

//       </div>


//       <p className="text-gray-600">{report.description}</p>

//       <div className="flex items-center justify-between">
//         <p className="inline-block bg-blue-400 text-black px-3 py-1 text-sm font-semibold rounded-sm">
//           Severity: {report.severity}
//         </p>

//         <span
//           className={`inline-block px-3 py-1 text-sm font-semibold rounded-sm ${report.status === "Resolved" ? "bg-green-400 text-black" : "bg-red-400 text-black"
//             }`}
//         >
//           {report.status}
//         </span>
//       </div>

//       <p className="text-sm text-gray-500">
//         Reported By: <span className="font-medium">{report.reportedBy?.name || "Unknown"}</span>
//       </p>

//       <div className="flex items-center justify-between text-blue-600">
//         <a href="">View Pictures</a>
//         <a href="">Watch Videos</a>
//       </div>
//     </div>
//   )
// }

// export default ReportCard
