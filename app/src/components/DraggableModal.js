import React from 'react';
import Draggable from 'react-draggable';

const DraggableModal = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <Draggable>
      <div className="modal-overlay">
        <div className="modal-content">
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

export default DraggableModal;
