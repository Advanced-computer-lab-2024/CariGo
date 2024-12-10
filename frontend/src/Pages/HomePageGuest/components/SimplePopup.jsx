import React, { useEffect } from 'react';

export default function SimplePopup({ isOpen, onClose, message }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 right-0 bg-[#f7c59f] text-[#01324c] p-4 text-center font-semibold z-50" style={{ top: '60px' }}>
      {message}
    </div>
  );
}

