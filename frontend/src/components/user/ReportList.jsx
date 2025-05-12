// import React, { useState } from 'react';
// import ReportCard from './ReportCard';

// const ReportList = ({ reports }) => {
//   const [showAll, setShowAll] = useState(false);

//   const visibleReports = showAll ? reports : reports.slice(0, 3);

//   return (
//     <div className="space-y-4">
//       {visibleReports.map((report, index) => (
//         <ReportCard key={index} report={report} />
//       ))}

//       {reports.length > 3 && (
//         <button
//           onClick={() => setShowAll(!showAll)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           {showAll ? "Show Less" : "View All"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ReportList;


//////////////////////////////
import React from 'react'
import ReportCard from './ReportCard'
const ReportList = ({ reports }) => {
  // console.log(reports)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {reports && reports.map((report) => (
        <ReportCard key={report._id} report={report} />
      ))}
    </div>
  )
}

export default ReportList
