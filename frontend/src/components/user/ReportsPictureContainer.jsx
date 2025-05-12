
import React from "react";
import ReportsPictureList from "./ReportsPictureList";
import { useLocation } from "react-router-dom";

const ReportsPictureContainer = () => {
  const { state } = useLocation();
  const report = state?.report;

  // Better error handling
  if (!report) {
    return (
      <div className="mt-6 px-4">
        <h2 className="inline-block text-3xl lg:text-4xl font-extrabold text-red-500 mb-6 border-b-3 border-b-red-600">
          Incident Pictures
        </h2>
        <div className="w-full min-h-[calc(100vh-16rem)] flex justify-center items-center">
          <p className="text-2xl font-semibold text-gray-600">No report data available.</p>
        </div>
      </div>
    );
  }

  const hasImages = report?.images?.length > 0;

  return (
    <div className="mt-6 px-4">
      <h2 className="inline-block text-3xl lg:text-4xl font-extrabold text-red-500 mb-6 border-b-3 border-b-red-600">
        Incident Pictures
      </h2>
      {hasImages ? (
        <ReportsPictureList images={report.images} />
      ) : (
        <div className="w-full min-h-[calc(100vh-16rem)] flex justify-center items-center">
          <p className="text-2xl font-semibold text-gray-600">No images found for this report.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPictureContainer;