import React from 'react';
import './styles/CompanyInfo.css'; // Import your CSS styles

const CompanyInfo = ({ userName, description, website, hotline , about}) => {
  return (
    <div className="company-info">
      <h2>{userName}</h2>
      <p><strong>About:</strong> {about}</p> {/* Display about */}
      <p><strong>Contact:{hotline}</strong> {}</p> {/* Display hotline */}
      <p>{description}</p>
      <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
        {website}
      </a>
    </div>
  );
};

export default CompanyInfo;
