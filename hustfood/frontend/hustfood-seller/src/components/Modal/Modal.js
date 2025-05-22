import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal_overlay" onClick={onClose}></div>
      <div className="modal_content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
