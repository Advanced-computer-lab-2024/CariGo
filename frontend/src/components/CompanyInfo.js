import React from 'react';
import './styles/CompanyInfo.css';


const CompanyInfo = ({ description, website }) => {
  return (
    <div className="company-info">
      <h2>About Us</h2>
      <p>{description}</p>
      <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
    </div>
  );
};

export default CompanyInfo;
