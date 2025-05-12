import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useReports } from '../../contexts/ReportContext'
import { useLocation } from 'react-router-dom';
import { FormatIndentIncreaseSharp } from '@mui/icons-material';



const LoadingState = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    <p>{message}</p>
  </div>
);

const LiveUpdates = () => {

  const location = useLocation()

  const { loading, error, volunteers, fetchVolunteers } = useAuth()
  const { reports, fetchAllReports } = useReports()


  // const activeIncident = reports.filter((report) => report.status === 'Active')
  // const resolvedIncident = reports.filter((report) => report.status === 'Resolved')

  const activeIncident = Array.isArray(reports) ? reports.filter((report) => report.status === 'Active') : [];
  const resolvedIncident = Array.isArray(reports) ? reports.filter((report) => report.status === 'Resolved') : [];


  useEffect(() => {
    fetchVolunteers()
    fetchAllReports();

  }, [location])


  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className='flex flex-col xl:flex-row justify-between  gap-3 mt-5 mb-10'>
      <div className='flex items-center justify-start gap-4'>
        <h2 className='text-xl md:text-3xl font-bold tracking-wide'>Disaster Monitor</h2>

        {/* <span className='text-2xl block bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-[length:200%_200%] animate-gradient-x  text-white py-1 px-3 rounded-lg tracking-wide'>
          Live Updates
        </span> */}

        <span className='text-xl md:text-2xl block  bg-gradient-to-r from-red-500 via-red-900 to-red-500 bg-[length:200%_100%] bg-[position:-200%_0] animate-[var(--animate-shimmer)] text-white py-1 px-3 rounded-lg tracking-wide'>
          Live Updates
        </span>
      </div>

      <div className='flex items-center flex-wrap gap-2 mt-2 '>
        <p className='bg-red-100 text-xs md:text-md py-2 px-2 shadow-md'>🚨 {activeIncident?.length || 0} Active Incidents</p>
        <p className='bg-green-100 text-xs md:text-md py-2 px-2 shadow-md'>✅ {resolvedIncident?.length || 0} Resolved</p>
        <p className='bg-violet-100 text-xs md:text-md py-2 px-2 shadow-md'> {volunteers?.length || 0} Responders Online</p>
      </div>
    </div>

  )
}

export default LiveUpdates
