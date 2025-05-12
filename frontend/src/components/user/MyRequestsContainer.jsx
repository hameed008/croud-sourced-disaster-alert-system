
import React, { useEffect } from "react";
import MyRequestsList from "./MyRequestsList";
import { useRequests } from "../../contexts/RequestContext";
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

const MyRequestsContainer = () => {
  const { requests, loading, error, fetchAllRequests } = useRequests();
  const { user } = useAuth()

  const myRequests = requests.filter(report => report.requestedBy?._id === user?._id);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className=" w-full mt-6 px-4">
      <h2 className="inline-block text-3xl lg:text-4xl font-extrabold text-green-500 mb-8 border-b-3 border-b-green-500">
        My Requests
      </h2>
      {myRequests.length === 0 ? (
        <div className="w-full min-h-[calc(100vh-20rem)] flex items-center justify-center">
          <h2 className="text-gray-600 text-3xl font-semibold">No requests found.</h2>
        </div>
      ) : (
        <MyRequestsList requests={myRequests} />
      )}
    </div>
  );
};

export default MyRequestsContainer;
