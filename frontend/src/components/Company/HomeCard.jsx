import React from "react";

const HomeCard = ({ title, icon: Icon, count, className }) => {
  return (
    <div className={`card ${className}`} style={{ borderRadius: '1.6rem' }}>
      <div className="card-body text-center">
        <Icon size={40} />
        <h5 className="card-title mt-2">{title}</h5>
        <p className="card-text" style={{fontSize:'165%'}}>{count}</p>
      </div>
    </div>
  );
};

export default HomeCard;
