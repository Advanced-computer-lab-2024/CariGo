import React from 'react';
import './styles/CompanyInfo.css'; // Import your CSS styles

const CompanyInfo = ({ 
  userName, 
  email, 
  role, 
  hotline, 
  website, 
  about, 
  passwordChangedAt, 
  description 
}) => {
  return (
    <div className="company-info">
      <h2>{userName}</h2>
      <p><strong>Email:</strong> {email}</p> {/* Display email */}
      <p><strong>Role:</strong> {role}</p> {/* Display role */}
      <p><strong>Hotline:</strong> {hotline}</p> {/* Display hotline */}
      <p><strong>About:</strong> {about}</p> {/* Display about */}
      <p><strong>Description:</strong> {description}</p> {/* Display description */}
      <p>
        <strong>Password Last Changed:</strong> 
        {passwordChangedAt ? new Date(passwordChangedAt).toLocaleDateString() : 'N/A'}
      </p> {/* Display passwordChangedAt */}
      <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
        {website}
      </a>
    </div>
  );
};

export default CompanyInfo;
