import React, { createContext, useState, useContext } from "react";
import {
  fetchReports,
  createReport as createReportApi,
  updateReport as updateReportApi,
  deleteReport as deleteReportApi,
} from "../services/reports"; // Import API functions

// Create the ReportContext
const ReportContext = createContext();

// Create the ReportProvider component
export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]); // List of reports
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all reports
  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const response = await fetchReports();
      // console.log(response.data)
      setReports(response.data.reports);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new report
  const createReport = async (reportData) => {
    setLoading(true);
    try {
      const response = await createReportApi(reportData);
      setReports((prevReports) => [...prevReports, response.data.report]);
      setError(null);
      return response.data.data; // Return the created report
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create report.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Update a report
  const updateReport = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await updateReportApi(id, updatedData);
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? response.data.report : report
        )
      );

      setError(null);
      return response.data.data; // Return the updated report
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update report.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Delete a report
  const deleteReport = async (id) => {
    setLoading(true);
    try {
      await deleteReportApi(id);
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== id)
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete report.");
      throw err; // Re-throw the error for handling in the component
    } finally {
      setLoading(false);
    }
  };

  // Provide the context value
  const value = {
    reports,
    loading,
    error,
    fetchAllReports,
    createReport,
    updateReport,
    deleteReport,
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook to use the ReportContext
export const useReports = () => useContext(ReportContext);

////////////////////////////////////////////////////////////////////////////////
// import { createContext, useContext, useState } from 'react';
// import { createReport, getReports, updateReport, deleteReport } from '../services/reportService';

// const ReportContext = createContext();

// export const ReportProvider = ({ children }) => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all reports
//   const fetchReports = async () => {
//     setLoading(true);
//     try {
//       const data = await getReports();
//       setReports(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create a new report
//   const addReport = async (reportData) => {
//     setLoading(true);
//     try {
//       const newReport = await createReport(reportData);
//       setReports((prevReports) => [...prevReports, newReport]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update a report
//   const editReport = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       const updatedReport = await updateReport(id, updatedData);
//       setReports((prevReports) =>
//         prevReports.map((report) => (report._id === id ? updatedReport : report))
//       );
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a report
//   const removeReport = async (id) => {
//     setLoading(true);
//     try {
//       await deleteReport(id);
//       setReports((prevReports) => prevReports.filter((report) => report._id !== id));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ReportContext.Provider value={{
//       reports,
//       loading,
//       error,
//       fetchReports,
//       addReport,
//       editReport,
//       removeReport
//     }}>
//       {children}
//     </ReportContext.Provider>
//   );
// };

// export const useReport = () => useContext(ReportContext);

// // Let me know if you’d like me to tweak anything! 🚀
