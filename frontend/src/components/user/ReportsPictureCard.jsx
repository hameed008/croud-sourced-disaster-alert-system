import React from 'react';

const ReportsPictureCard = ({ image }) => {
  return (
    <div className='w-[90%] mx-auto'>
      <a href={image.url} target="_blank" rel="noopener noreferrer">
        <img src={image.url} alt="Incident Picture" className='w-full' />
      </a>
    </div>
  );
};

export default ReportsPictureCard;