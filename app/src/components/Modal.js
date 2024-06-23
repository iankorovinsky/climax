import React from 'react';

const Modal = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
        <button className="start-agent">Start Agent 🤖</button>
        <button className="close-button" onClick={onClose}>🌎</button>
        </div>

        <h2>Country Information</h2>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;