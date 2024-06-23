import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Modal = ({ show, onClose, onStartAgent, content, country }) => {
  if (!show) return null;

  return (
    <Draggable>
      <div className="modal-overlay">
        <div className="modal-content">
          <div>
            <button className="start-agent" onClick={onStartAgent}>Start Agent 🤖</button>
            <button className="close-button" onClick={onClose}>🌎</button>
          </div>
          <h2>Country Information</h2>
          <p>{content}</p>
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;