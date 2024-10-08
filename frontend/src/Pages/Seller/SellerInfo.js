import React from 'react';
import '../../components/styles/CompanyInfo.css'; // Assuming you have some styles for the component

const SellerInfo = ({ userName, email, description,/*previousWork,*/mobileNumber }) => {
  return (
    <div className="company-info">
      <h2>{userName}</h2>
      <p><strong>Email:</strong> {email}</p>
      {/* <p><strong>Role:</strong> {role}</p> */}
      <p><strong>Dsecription:</strong> {description}</p>
      {/* <p><strong>Previous work:</strong> {previousWork}</p> */}
      <p><strong>Mobile Number:</strong> {mobileNumber}</p>
      {/* <p><strong>Description:</strong> {description}</p> */}
    </div>
  );
};

export default SellerInfo;
