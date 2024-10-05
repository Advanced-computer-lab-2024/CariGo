// src/components/ImageModal.js
import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, imageSrc, altText }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }}
    >
      <button onClick={onRequestClose} style={{ position: 'absolute', right: '20px', top: '20px', color: 'white' }}>
        Close
      </button>
      <img src={imageSrc} alt={altText} style={{ width: '100%', height: 'auto' }} />
    </Modal>
  );
};

export default ImageModal;
