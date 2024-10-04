
import React from 'react';
import './styles/ProfileHeader.css';

const ProfileHeader = ({ companyName, logo, coverImage }) => {
  return (
    <div className="profile-header">
      <img className="cover-image" src={coverImage} alt={`${companyName} cover`} />
      <div className="profile-details">
        <img className="logo" src={logo} alt={`${companyName} logo`} />
        <h1>{companyName}</h1>
      </div>
    </div>
  );
};

export default ProfileHeader;
