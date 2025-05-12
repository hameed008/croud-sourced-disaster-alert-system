
import React from 'react'
import MyRequestsCard from './MyRequestsCard'
const MyRequestsList = ({ requests }) => {

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {requests.map((request) => (
        <MyRequestsCard key={request._id} request={request} />
      ))}
    </div>
  )
}

export default MyRequestsList;
