import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, icon: Icon, count }) => {
  return (
    <div className='card bg-light shadow-sm'>
      <div className='card-body'>
        <div className='d-flex align-items-center mb-2'>
          <Icon className='me-1 ms-0' size={26} />
          <h5 className='card-title mb-0'>{title}</h5>
        </div>
        <h4 className='card-text'>{count}</h4>
      </div>
    </div>
  );
};

export default Card;
