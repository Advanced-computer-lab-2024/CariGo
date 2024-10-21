import React from 'react';
import './styles/CompanyInfo.css'; // Assuming you have some styles for the component

const TourGuideInfo = ({ userName, email, yearsOfExperience, previous_work, mobileNumber }) => {
  return (
    <div className="company-info">
      <h2>{userName}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Years of Experience:</strong> {yearsOfExperience}</p>
      <p><strong>Mobile Number:</strong> {mobileNumber}</p>
      
      {/* Display Previous Work */}
      <div>
        <strong>Previous Work:</strong>
        {previous_work && previous_work.length > 0 ? (
          <p>{previous_work.join(', ')}</p>
        ) : (
          <p>No previous work available.</p>
        )}
      </div>
    </div>
  );
};

export default TourGuideInfo;
