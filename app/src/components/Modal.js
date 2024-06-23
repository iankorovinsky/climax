import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Modal = ({ show, onClose, content, country }) => {
  const [currentPolicy, setCurrentPolicy] = useState('');
  if (!show) return null;
  

  async function callCurrentPolicySummary() {
    console.log(country);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/current_policy?country=${encodeURIComponent(country)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response is not JSON");
      }

      const data = await response.json();
      const dataString = JSON.stringify(data);

      setCurrentPolicy(dataString);
      console.log(dataString); // You can remove this line if not needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setCurrentPolicy('Error fetching data'); // Set a default error message
    }
  }

  return (
    <Draggable>
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <button className="start-agent" onClick={callCurrentPolicySummary}>Start Agent 🤖</button>
          <button className="close-button" onClick={onClose}>🌎</button>
        </div>

        <h2>Country Information</h2>
        <p>{currentPolicy || content}</p>
      </div>
    </div>
    </Draggable>
  );
};

export default Modal;
