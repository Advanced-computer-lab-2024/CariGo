import React from 'react';
import './styles/TouristInfo.css'; // Assuming you have some styles for the component

const TouristInfo = ({ userName, email, role, mobile,nationality, job, wallet }) => {
  return (
    <div className="tourist-info">
      <h2>{userName}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Mobile:</strong> {mobile}</p>
      <p><strong>nationality:</strong> {nationality}</p>
      <p><strong>job:</strong> {job}</p>
      <p><strong>wallet:</strong> {wallet}</p>
    </div>
  );
};

export default TouristInfo;
