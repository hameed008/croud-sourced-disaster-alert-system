import React from 'react'
import RequestCard from './RequestCard'

const RequestList = ({ requests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {requests.map((request) => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  )
}

export default RequestList
