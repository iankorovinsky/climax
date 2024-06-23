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


// import React, { useState } from 'react';
// import Draggable from 'react-draggable';

// const Modal = ({ show, onClose, content, country }) => {
//   const [currentPolicy, setCurrentPolicy] = useState('');
//   const [modalStack, setModalStack] = useState([]);
  
//   if (!show) return null;

//   async function callCurrentPolicySummary() {
//     const endpoints = [
//       `http://127.0.0.1:5000/api/current_policy?country=${encodeURIComponent(country)}`,
//       `http://127.0.0.1:5000/api/similar_policy?country=${encodeURIComponent(country)}`,
//       `http://127.0.0.1:5000/api/calculate_prediction?country=${encodeURIComponent(country)}`,
//       `http://127.0.0.1:5000/api/generate_recommendation?country=${encodeURIComponent(country)}`,
//     ];

//     for (let i = 0; i < endpoints.length; i++) {
//       try {
//         const response = await fetch(endpoints[i]);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new TypeError('Response is not JSON');
//         }

//         const data = await response.json();
//         const dataString = JSON.stringify(data);

//         setModalStack((prevStack) => [
//           ...prevStack,
//           { content: dataString, country, position: { top: `${10 * i}%`, left: `${10 * i}%` } }
//         ]);
//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//         setModalStack((prevStack) => [
//           ...prevStack,
//           { content: 'Error fetching data', country, position: { top: `${10 * i}%`, left: `${10 * i}%` } }
//         ]);
//       }
//     }
//   }

//   return (
//     <>
//       {modalStack.map((modal, index) => (
//         <Draggable key={index}>
//           <div className="modal-overlay" style={modal.position}>
//             <div className="modal-content">
//               <div>
//                 <button className="close-button" onClick={onClose}>🌎</button>
//               </div>
//               <h2>Country Information</h2>
//               <p>{modal.content}</p>
//             </div>
//           </div>
//         </Draggable>
//       ))}
//       <Draggable>
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div>
//               <button className="start-agent" onClick={callCurrentPolicySummary}>Start Agent 🤖</button>
//               <button className="close-button" onClick={onClose}>🌎</button>
//             </div>
//             <h2>Country Information</h2>
//             <p>{currentPolicy || content}</p>
//           </div>
//         </div>
//       </Draggable>
//     </>
//   );
// };

// export default Modal;
