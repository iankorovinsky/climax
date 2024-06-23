// src/MiniModal.js
import React from 'react';
import Draggable from 'react-draggable';

const MiniModal = ({ header,content, position, onClose }) => {
  const formattedContent = JSON.stringify(JSON.parse(content), null, 2);

  return (
    <Draggable>
      <div className="mini-modal-overlay" style={position}>
        <div className="mini-modal-content">
          <div>
            <button className="close-button" onClick={onClose}>🌎</button>
          </div>
        
          <h2>{header}</h2>
          <pre><code>{formattedContent}</code></pre>
        </div>
      </div>
    </Draggable>
  );
};

export default MiniModal;
