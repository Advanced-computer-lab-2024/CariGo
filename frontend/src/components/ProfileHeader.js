import React, { useState } from 'react';
import ImageModal from './ImageModal'; // Modal to display images
import SmallButton from './smallButton'; // Button component
import './styles/ProfileHeader.css'; // Styles for ProfileHeader

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
        onClick={() => openModal(coverImage)}
      />
      <div className="profile-details">
        <img 
          className="logo" 
          src={logo} 
          alt={`${companyName} logo`} 
          onClick={() => openModal(logo)}
        />
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
