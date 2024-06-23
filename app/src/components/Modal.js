import React from 'react';

const Modal = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
        <buttom className="start-agent">Start Agent 🤖</buttom>
        <button className="close-button" onClick={onClose}>🌎</button>
        </div>

        <h2>Country Information</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;