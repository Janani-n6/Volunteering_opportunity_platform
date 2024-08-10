import React from 'react';
import './CustomCard.css';

const CustomCard = ({ image, title, description }) => {
  return (
    <div className="custom-card">
      <img src={image} alt={title} className="custom-card-image" />
      <div className="custom-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CustomCard;
