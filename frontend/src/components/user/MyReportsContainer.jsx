import React, { useEffect } from "react";

import MyReportList from "./MyReportList";
import { useReports } from "../../contexts/ReportContext";
import { useAuth } from "../../contexts/AuthContext";

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

const MyReportsContainer = () => {
  const { reports, loading, error, fetchAllReports } = useReports();
  const { user } = useAuth()

  const myReports = reports.filter(report => report.reportedBy?._id === user?._id);


  useEffect(() => {
    fetchAllReports();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className=" w-full mt-6 px-4">
      <h2 className="inline-block text-3xl lg:text-4xl font-extrabold text-red-500 mb-8 border-b-3 border-b-red-500">
        My Reports
      </h2>
      {myReports.length === 0 ? (
        <div className="w-full min-h-[calc(100vh-20rem)] flex items-center justify-center">
          <h2 className="text-gray-600 text-3xl font-semibold">No reports found.</h2>
        </div>
      ) : (
        <MyReportList reports={myReports} />
      )}
    </div>
  );
};

export default MyReportsContainer;
