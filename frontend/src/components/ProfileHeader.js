import React, { useState } from 'react';
import './styles/ProfileHeader.css';
import ImageModal from './ImageModal'; // Import the modal component

import SmallButton from './smallButton';

const ProfileHeader = ({ companyName, logo, coverImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  return (
    <div className="profile-header">
      <img 
        className="cover-image" 
        src={coverImage} 
        alt={`${companyName} cover`} 
        onClick={() => openModal(coverImage)} // Open modal for cover image
      />
      <div className="profile-details">
        <img 
          className="logo" 
          src={logo} 
          alt={`${companyName} logo`} 
          onClick={() => openModal(logo)} // Open modal for logo
        />
        <SmallButton /> {/* Drawer button in the header */} 
        
      </div>
      <ImageModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        imageSrc={currentImage} 
        altText={companyName}
      />
    </div>
  );
};

export default ProfileHeader;
