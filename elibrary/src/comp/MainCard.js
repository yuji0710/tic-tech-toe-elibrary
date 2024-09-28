import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainCard = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div className="card h-100">
      {/* Updated image styles for full display */}
      <img 
        src={imageUrl} 
        className="card-img-top" 
        style={{ height: '250px', width: '100%', objectFit: 'cover' }} 
        alt={title} 
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.2rem' }}>{title}</h5>
        <p className="card-text" style={{ fontSize: '0.9rem', height: '40px', overflow: 'hidden' }}>
          {description ? (description.length > 80 ? description.substring(0, 80) + '...' : description) : "No Description"}
        </p>
        <p className="card-text"><small className="text-muted">By {author || "Unknown Author"} - {source || "Unknown Source"}</small></p>
        <a href={newsUrl} className="btn btn-primary">Read More</a>
      </div>
    </div>
  );
};

export default MainCard;
