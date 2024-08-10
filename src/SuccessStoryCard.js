import React from 'react';
import './SuccessStoryCard.css';

const SuccessStoryCard = ({ image, story, details }) => {
  return (
    <div className="success-story-card">
      <img src={image} alt="Story" className="success-story-card-image" />
      <div className="success-story-card-content">
        <p>{story}</p>
        <small>{details}</small>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
