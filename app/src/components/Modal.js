import React from 'react';

const Modal = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Marker Information</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;