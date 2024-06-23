// src/MiniModal.js
import React from 'react';
import Draggable from 'react-draggable';

const MiniModal = ({ header, content, position, onClose }) => {
  console.log(header)
  return (
    <Draggable>
      <div className="mini-modal-overlay" style={position}>
        <div className="mini-modal-content">
          <div>
            <button className="close-button" onClick={onClose}>🌎</button>
          </div>
        
          <h2>{header}</h2>
          <div>{content}</div>
        </div>
      </div>
    </Draggable>
  );
};

export default MiniModal;
