import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainCard.css';

const MainCard = ({ title, description, imageUrl, newsUrl, author, date }) => {
  const hasImage = !!imageUrl;

  // For testing, replace newsUrl with a static URL
  const exampleUrl = newsUrl || "https://www.example.com"; // Replace with any valid URL

  return (
    <div
      className="card shadow-sm"
      style={{
        borderRadius: '10px',
        margin: '10px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Card Image */}
      {hasImage ? (
        <img
          src={imageUrl}
          className="card-img-top"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          alt={title}
        />
      ) : (
        <div
          style={{
            height: '220px',
            width: '100%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            color: '#999',
          }}
        >
          No Image Available
        </div>
      )}

      {/* Overlay */}
      <div
        className="card-img-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ textAlign: 'center' }}>
          {description || "No Description Available"}
        </p>
        <p className="card-text"><small>By {author || "Unknown Author"}</small></p>
        <p className="card-text"><small>{date}</small></p>

        {/* Link styled as a button */}
        <a
          href={exampleUrl}
          className="btn btn-outline-light btn-sm"
          style={{
            borderRadius: '20px',
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Link
        </a>
      </div>

      {/* Hover effect to reveal overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.previousSibling.style.opacity = '1'; // Show overlay on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.previousSibling.style.opacity = '0'; // Hide overlay when not hovering
        }}
      />
    </div>
  );
};

export default MainCard;
