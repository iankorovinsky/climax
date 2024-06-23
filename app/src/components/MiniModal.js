// src/MiniModal.js
import React from 'react';
import Draggable from 'react-draggable';

const MiniModal = ({ content, position, onClose }) => {
  return (
    <Draggable>
      <div className="mini-modal-overlay" style={position}>
        <div className="mini-modal-content">
          <div>
            <button className="close-button" onClick={onClose}>🌎</button>
          </div>
          <h2>Country Information</h2>
          <p>{content}</p>
        </div>
      </div>
    </Draggable>
  );
};

export default MiniModal;
