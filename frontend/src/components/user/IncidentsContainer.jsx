import React, { useEffect } from "react";
import ReportList from "./ReportList";
import { useReports } from "../../contexts/ReportContext";

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

const IncidentsContainer = () => {
  const { reports, loading, error, fetchAllReports } = useReports();

  const sortedReports = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));



  useEffect(() => {
    fetchAllReports();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className=" mt-16 px-4">
      <h2 className=" inline-block text-3xl lg:text-4xl font-extrabold text-red-500 border-b-3 border-red-500 mb-6">
        Reported Incidents
      </h2>
      {sortedReports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <ReportList reports={sortedReports} />
      )}
    </div>
  );
};

export default IncidentsContainer;
