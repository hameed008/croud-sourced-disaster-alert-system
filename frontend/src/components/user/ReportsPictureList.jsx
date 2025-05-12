import React from 'react'
import ReportsPictureCard from './ReportsPictureCard';

const ReportsPictureList = ({ images }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {images.map((image) => (
        <ReportsPictureCard key={image._id} image={image} />
      ))}
    </div>
  )
}

export default ReportsPictureList;
