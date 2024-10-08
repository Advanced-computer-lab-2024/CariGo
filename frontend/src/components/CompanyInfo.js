import React from 'react';
import './styles/CompanyInfo.css'; // Assuming you have some styles for the component

const CompanyInfo = ({ userName, email, role, hotline, website, about, description }) => {
  return (
    <div className="company-info">
      <h2>{userName}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Hotline:</strong> {hotline}</p>
      <p><strong>Website:</strong> <a href={website}>{website}</a></p>
      <p><strong>About:</strong> {about}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default CompanyInfo;
