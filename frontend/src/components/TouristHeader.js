import React, { useState } from 'react';
import { Box, Avatar, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const StyledCoverImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  cursor: 'pointer',
});

const StyledLogo = styled(Avatar)({
  width: 120,
  height: 120,
  border: '4px solid #FFFFFF',
  position: 'absolute',
  bottom: -60,
  left: 24,
  cursor: 'pointer',
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledModalContent = styled(Box)({
  position: 'relative',
  maxWidth: '90%',
  maxHeight: '90%',
});

const StyledModalImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '90vh',
  objectFit: 'contain',
});

const StyledCloseButton = styled(IconButton)({
  position: 'absolute',
  top: 10,
  right: 10,
  color: '#FFFFFF',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

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
    <Box sx={{ position: 'relative', mb: 8, backgroundColor: '#f7c59f' }}>
      <StyledCoverImage
        src={coverImage}
        alt={`${companyName} cover`}
        onClick={() => openModal(coverImage)}
      />
      <StyledLogo
        src={logo}
        alt={`${companyName} logo`}
        onClick={() => openModal(logo)}
      />
      <StyledModal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="image-modal"
        aria-describedby="enlarged image view"
      >
        <StyledModalContent>
          <StyledModalImage src={currentImage} alt={companyName} />
          <StyledCloseButton onClick={closeModal} aria-label="close">
            <CloseIcon />
          </StyledCloseButton>
        </StyledModalContent>
      </StyledModal>
    </Box>
  );
};

export default ProfileHeader;

