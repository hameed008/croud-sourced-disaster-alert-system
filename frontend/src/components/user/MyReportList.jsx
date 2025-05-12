import React from 'react'
import MyReportsCard from './MyReportsCard'
const MyReportList = ({ reports }) => {

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {reports.map((report) => (
        <MyReportsCard key={report._id} report={report} />
      ))}
    </div>
  )
}

export default MyReportList
